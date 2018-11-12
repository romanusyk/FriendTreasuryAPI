package romanusyk.ft.service.interfaces;

import romanusyk.ft.domain.Group;
import romanusyk.ft.domain.User;
import org.springframework.transaction.annotation.Transactional;
import romanusyk.ft.domain.UserStatistics;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.Set;

/**
 * Created by romm on 03.02.17.
 */
public interface UserService {

    User getUserByID(Integer id);

    User validateUser(User user);

    List<User> getAllUsers();

    User getUserByUsername(String username);

    Integer createUser(User user);

    void updateUser(User user);

    void addUserToGroup(Integer userID, String groupName);

    void removeUserFromGroup(Integer userID, String groupName);

    void checkIfExists(User user);

    UserStatistics getUserStatistics(User client);

    UserStatistics getUserStatistics(User client, Set<Group> groupSet);

}
