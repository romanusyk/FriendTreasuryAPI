package romanusyk.ft.service.interfaces;

import romanusyk.ft.domain.User;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.util.List;

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

    void addUserToGroup(Integer userID, Integer groupID);

    void removeUserFromGroup(Integer userID, Integer groupID);

}
