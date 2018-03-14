package romanusyk.ft.service.interfaces;

import romanusyk.ft.domain.Group;
import romanusyk.ft.domain.User;

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
