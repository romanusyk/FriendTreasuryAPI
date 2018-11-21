package romanusyk.ft.service.interfaces;

import romanusyk.ft.data.entity.User;
import romanusyk.ft.data.model.dto.GroupAdvancedDTO;
import romanusyk.ft.data.model.dto.GroupDTO;
import romanusyk.ft.data.model.dto.UserDTO;

import java.util.List;

/**
 * Created by romm on 29.08.17.
 */
public interface GroupService {

    GroupDTO createGroup(GroupDTO group, UserDTO client);

    GroupDTO getGroupByName(String groupTitle);

    GroupDTO updateGroup(GroupDTO group, UserDTO client);

    List<GroupDTO> getGroupsByUser(User client);

    List<GroupAdvancedDTO> getGroupsByUserWithMeta(UserDTO client);

    GroupDTO getGroupById(Integer groupID);

    void checkIfGroupNotExist(GroupDTO groupDTO);

}
