package romanusyk.ft.service.interfaces;

import romanusyk.ft.data.entity.User;
import romanusyk.ft.data.model.dto.GroupAdvancedDTO;
import romanusyk.ft.data.model.dto.GroupDTO;

import java.util.List;

/**
 * Created by romm on 29.08.17.
 */
public interface GroupService {

    GroupDTO createGroup(GroupDTO group, User client);

    GroupDTO getGroupByName(String groupTitle);

    GroupDTO updateGroup(GroupDTO group, User client);

    List<GroupDTO> getGroupsByUser(User client);

    List<GroupAdvancedDTO> getGroupsByUserWithMeta(User client);

    GroupDTO getGroupById(Integer groupID);

}
