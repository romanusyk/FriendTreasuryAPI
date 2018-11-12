package romanusyk.ft.web;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import romanusyk.ft.data.entity.Group;
import romanusyk.ft.data.model.dto.GroupAdvancedDTO;
import romanusyk.ft.data.entity.User;
import romanusyk.ft.data.model.dto.GroupDTO;
import romanusyk.ft.data.model.dto.UserStatistics;
import romanusyk.ft.exception.EntityNotFoundException;
import romanusyk.ft.exception.UserAuthenticationException;
import romanusyk.ft.security.JwtUtil;
import romanusyk.ft.service.interfaces.GroupService;
import romanusyk.ft.service.interfaces.UserService;
import romanusyk.ft.utils.converter.GroupAdvancedConverter;
import romanusyk.ft.utils.converter.GroupConverter;
import romanusyk.ft.utils.converter.UserConverter;

import javax.validation.Valid;
import java.lang.invoke.MethodHandles;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Created by Roman Usyk on 12.09.17.
 */
@CrossOrigin
@RestController
@Api("Group controller")
@RequestMapping("/api/v1/groups") // TODO: 12.11.18 add conumes & produce
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;
    private final UserService userService;
    private final JwtUtil jwtUtil;

    @ApiOperation(
            value = "Get group by title",
            produces = "Application/json"
    )
    @RequestMapping(value = "", method = RequestMethod.GET)
    @PreAuthorize("@securityService.hasRole('user')")
    @ResponseBody
    public GroupDTO getGroupByName(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token")
                @RequestHeader("${ft.token.header}")
                String authorization,
            @RequestParam("name") String groupName
    ) {
        Group group = groupService.getGroupByName(groupName);
        if (group == null) {
            throw new EntityNotFoundException(Group.class, GroupDTO.builder().title("unknown").name(groupName).build());
        }
        return GroupConverter.to(group);
    }

    @PostMapping
    @PreAuthorize("@securityService.hasRole('user')")
    @ResponseBody
    public GroupDTO createGroup(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization,
            @RequestBody @Valid GroupDTO groupDTO) {

        User me = jwtUtil.getUserFromClaims(jwtUtil.getClamsFromToken(authorization));
        Group group = GroupConverter.from(groupDTO);
        logger.debug(String.format("User %d is creating group %s", me.getId(), group.toString()));
        User creator = userService.getUserByID(me.getId());
        group = groupService.createGroup(group, creator);
        return GroupConverter.to(group);
    }

    @PatchMapping
    @PreAuthorize("@securityService.hasRole('user')")
    @ResponseBody
    public GroupDTO updateGroup(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization,
            @RequestBody @Valid GroupDTO groupDTO) {
        User u = jwtUtil.getUserFromClaims(jwtUtil.getClamsFromToken(authorization));
        User user = userService.getUserByID(u.getId());
        Group group = GroupConverter.from(groupDTO);
        if (!user.getGroups().contains(group)) {
            logger.debug(String.format("Access denied for user %d trying to modify group %s", u.getId(), group.toString()));
            throw new UserAuthenticationException("Group can be modified only by its participants.");
        }
        group = groupService.updateGroup(group);
        return GroupConverter.to(group);
    }

    @RequestMapping(value = "/my", method = RequestMethod.GET)
    @PreAuthorize("@securityService.hasRole('user')")
    @ResponseBody
    public List<GroupAdvancedDTO> getUserGroups(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization
        ) {
        User user = jwtUtil.getUserFromClaims(jwtUtil.getClamsFromToken(authorization));
        List<Group> groupList = groupService.getGroupsByUser(user);
        List<GroupAdvancedDTO> groupDTOList = new LinkedList<>();
        for (Group group: groupList) {
            Set<Group> groupSet = new HashSet<>();
            groupSet.add(group);
            UserStatistics userStatistics = userService.getUserStatistics(user, groupSet);
            GroupAdvancedDTO groupDTO = GroupAdvancedConverter.to(group, userStatistics.getDebt());
            groupDTOList.add(groupDTO);
        }
        return groupDTOList;
    }

    private static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

}
