package romanusyk.ft.service;

import romanusyk.ft.domain.User;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.util.List;

/**
 * Created by romm on 03.02.17.
 */
public interface UserService {

    User getUserByID(Integer id);

    @Transactional
    void createUser(User user);

    @Transactional(readOnly = true)
    User validateUser(User user);

    @Transactional(readOnly = true)
    List<User> getAllUsers();

    @Transactional(readOnly = true)
    User getUserByUsername(String username);

}
