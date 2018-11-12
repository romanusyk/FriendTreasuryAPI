package romanusyk.ft.service.interfaces;

import romanusyk.ft.data.entity.Group;
import romanusyk.ft.data.entity.User;

import java.util.List;

/**
 * Created by romm on 29.08.17.
 */
public interface GroupService {

    Group createGroup(Group group, User creator);

    Group getGroupByName(String groupTitle);

    Group updateGroup(Group group);

    List<Group> getGroupsByUser(User user);

    Group getGroupById(Integer groupID);

    void checkIfExists(Group group);

}
