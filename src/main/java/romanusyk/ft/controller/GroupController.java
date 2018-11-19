package romanusyk.ft.controller;

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
import romanusyk.ft.data.model.dto.UserDTO;
import romanusyk.ft.exception.EntityNotFoundException;
import romanusyk.ft.security.JwtUtil;
import romanusyk.ft.service.interfaces.GroupService;

import javax.validation.Valid;
import java.lang.invoke.MethodHandles;
import java.util.List;

/**
 * Created by Roman Usyk on 12.09.17.
 */
@CrossOrigin
@RestController
@Api("Group controller")
@RequestMapping("/api/v1/groups") // TODO: 12.11.18 add consumes & produce
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;
    private final JwtUtil jwtUtil;

    @ApiOperation(
            value = "Get group by title",
            produces = "Application/json"
    )
    @RequestMapping(value = "", method = RequestMethod.GET)
    @PreAuthorize("@securityService.hasRole('user')")
    @ResponseBody
    public GroupDTO getGroupByName(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization,
            @RequestParam("name") String groupName
    ) {
        GroupDTO group = groupService.getGroupByName(groupName);
        if (group == null) {
            throw new EntityNotFoundException(Group.class, GroupDTO.builder().title("unknown").name(groupName).build());
        }
        return group;
    }

    @PostMapping
    @PreAuthorize("@securityService.hasRole('user')")
    @ResponseBody
    public GroupDTO createGroup(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization,
            @RequestBody @Valid GroupDTO groupDTO) {

        UserDTO client = jwtUtil.getUserFromClaims(jwtUtil.getClamsFromToken(authorization));
        logger.debug(String.format("User %d is creating group %s", client.getId(), groupDTO.toString()));
        groupDTO = groupService.createGroup(groupDTO, client);
        return groupDTO;
    }

    @PatchMapping
    @PreAuthorize("@securityService.hasRole('user')")
    @ResponseBody
    public GroupDTO updateGroup(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization,
            @RequestBody @Valid GroupDTO groupDTO) {
        UserDTO client = jwtUtil.getUserFromClaims(jwtUtil.getClamsFromToken(authorization));
        groupDTO = groupService.updateGroup(groupDTO, client);
        return groupDTO;
    }

    @RequestMapping(value = "/my", method = RequestMethod.GET)
    @PreAuthorize("@securityService.hasRole('user')")
    @ResponseBody
    public List<GroupAdvancedDTO> getUserGroups(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization
        ) {
        UserDTO client = jwtUtil.getUserFromClaims(jwtUtil.getClamsFromToken(authorization));
        return groupService.getGroupsByUserWithMeta(client);
    }

    @PostMapping(value = "/check")
    @PreAuthorize("@securityService.hasRole('user')")
    @ResponseBody
    public void checkIfGroupExists(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization,
            @RequestBody @Valid GroupDTO groupDTO) {
        groupService.checkIfGroupNotExist(groupDTO);
    }

    private static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

}
