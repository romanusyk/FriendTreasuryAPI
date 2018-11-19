package romanusyk.ft.service.interfaces;

import romanusyk.ft.data.entity.Group;
import romanusyk.ft.data.entity.User;
import romanusyk.ft.data.model.dto.UserDTO;
import romanusyk.ft.data.model.dto.UserStatistics;

import java.util.List;
import java.util.Set;

/**
 * Created by romm on 03.02.17.
 */
public interface UserService {

    User getUserByID(Integer id);

    UserDTO getUserDTOByID(Integer id);

    UserDTO validateUser(UserDTO user);

    List<User> getAllUsers();

    List<UserDTO> getAllUsersDTO();

    List<UserDTO> getUsersInGroup(Integer groupId, UserDTO client);

    UserDTO getUserByUsername(String username);

    User createUser(User user);

    UserDTO createUserFromDTO(UserDTO user);

    void updateUser(User user);

    void updateUser(UserDTO userDTO, UserDTO creatorDTO);

    void addUserToGroup(Integer userID, String groupName);

    void removeUserFromGroup(Integer userID, String groupName);

    UserStatistics getUserStatistics(User client);

    UserStatistics getUserStatisticsByDTO(UserDTO client);

    UserStatistics getUserStatistics(User client, Set<Group> groupSet);

    void checkIfUserNotExist(UserDTO userDTO);

}
