package service;

import domain.User;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.util.List;

/**
 * Created by romm on 03.02.17.
 */
public interface UserService {

    @PostConstruct
    @Transactional
    void init();

    List<User> initTreasury(List<String> usernames);

    User getUserByID(Integer id);

    @Transactional
    void createUser(User user);
}
