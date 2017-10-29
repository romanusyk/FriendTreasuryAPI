package romanusyk.ft.service.interfaces;

import romanusyk.ft.domain.Group;
import romanusyk.ft.domain.User;

import java.util.List;

/**
 * Created by romm on 29.08.17.
 */
public interface GroupService {

    Integer createGroup(Group group, User creator);

    Group getGroupByTitle(String groupTitle);

    void updateGroup(Group group);

    List<Group> getGroupsByUser(User user);

    Group getGroupById(Integer groupID);

}
