package romanusyk.ft.web;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import romanusyk.ft.domain.Group;
import romanusyk.ft.domain.User;
import romanusyk.ft.exception.EntityNotFoundException;
import romanusyk.ft.exception.UserAuthenticationException;
import romanusyk.ft.security.JwtUtil;
import romanusyk.ft.service.interfaces.GroupService;
import romanusyk.ft.service.interfaces.UserService;

import javax.validation.Valid;
import java.lang.invoke.MethodHandles;
import java.util.List;

/**
 * Created by Roman Usyk on 12.09.17.
 */
@CrossOrigin
@RestController
@Api("Group controller")
@RequestMapping("/api/v1/groups")
public class GroupController {

    @Autowired
    private GroupService groupService;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @ApiOperation(
            value = "Get group by title",
            produces = "Application/json"
    )
    @RequestMapping(value = "", method = RequestMethod.GET)
    @PreAuthorize("@securityService.hasRole('user')")
    @ResponseBody
    public Group getGroupByName(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization,
            @RequestParam("name") String groupName
    ) {
        Group group = groupService.getGroupByName(groupName);
        if (group == null) {
            throw new EntityNotFoundException(Group.class, new Group("unknown", groupName));
        }
        return group;
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    @PreAuthorize("@securityService.hasRole('user')")
    @ResponseBody
    public Integer createGroup(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization,
            @RequestBody @Valid Group group) {

        User me = jwtUtil.getUserFromClaims(jwtUtil.getClamsFromToken(authorization));
        logger.debug(String.format("User %d is creating group %s", me.getId(), group.toString()));
        User creator = userService.getUserByID(me.getId());
        return groupService.createGroup(group, creator);
    }

    @RequestMapping(value = "", method = RequestMethod.PATCH)
    @PreAuthorize("@securityService.hasRole('user')")
    public void updateGroup(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization,
            @RequestBody @Valid Group group) {
        User u = jwtUtil.getUserFromClaims(jwtUtil.getClamsFromToken(authorization));
        User user = userService.getUserByID(u.getId());
        if (!user.getGroups().contains(group)) {
            logger.debug(String.format("Access denied for user %d trying to modify group %s", u.getId(), group.toString()));
            throw new UserAuthenticationException("Group can be modified only by its participants.");
        }
        groupService.updateGroup(group);
    }

    @RequestMapping(value = "/my", method = RequestMethod.GET)
    @PreAuthorize("@securityService.hasRole('user')")
    @ResponseBody
    public List<Group> getUserGroups(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization
        ) {
        User user = jwtUtil.getUserFromClaims(jwtUtil.getClamsFromToken(authorization));
        return groupService.getGroupsByUser(user);
    }

    private static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

}
