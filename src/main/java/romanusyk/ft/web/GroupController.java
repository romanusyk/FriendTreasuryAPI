package romanusyk.ft.web;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import romanusyk.ft.domain.Group;
import romanusyk.ft.domain.User;
import romanusyk.ft.exception.EntityNotFoundException;
import romanusyk.ft.service.interfaces.GroupService;

import javax.validation.Valid;
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
    GroupService groupService;

    @ApiOperation(
            value = "Get group by title",
            produces = "Application/json"
    )
    @RequestMapping(value = "", method = RequestMethod.GET)
    @ResponseBody
    public Group getGroupByTitle(@RequestParam("title") String groupTitle) {
        Group group = groupService.getGroupByTitle(groupTitle);
        if (group == null) {
            throw new EntityNotFoundException(Group.class, new Group(groupTitle));
        }
        return group;
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    @ResponseBody
    public Integer createGroup(
            @RequestHeader("Authorization") String authorization,
            @RequestBody @Valid Group group) {
        //TODO: Parse user from token
        User creator = null;

        return groupService.createGroup(group, creator);
    }

    @RequestMapping(value = "", method = RequestMethod.PATCH)
    public void updateGroup(
            @RequestHeader("Authorization") String authorization,
            @RequestBody @Valid Group group) {
        groupService.updateGroup(group);
    }

    @RequestMapping(value = "/my", method = RequestMethod.GET)
    @ResponseBody
    public List<Group> getUserGroups(@RequestHeader("Authorization") String authorization) {
        //TODO: Parse user from token
        User user = new User();
        user.setId(1);
        return groupService.getGroupsByUser(user);
    }

}
