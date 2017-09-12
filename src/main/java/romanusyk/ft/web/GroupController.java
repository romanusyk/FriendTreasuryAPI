package romanusyk.ft.web;

import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.*;
import romanusyk.ft.domain.Group;
import romanusyk.ft.domain.Payment;
import romanusyk.ft.domain.User;

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

    public Group getGroupByName(String groupName) { return null; }

    public List<Group> getUserGroups(@RequestHeader("Authorization") String authorization) {
        return null;
    }

}
