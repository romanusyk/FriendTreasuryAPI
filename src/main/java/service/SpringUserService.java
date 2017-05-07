package service;

import domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import repository.UserRepository;

import java.util.LinkedList;
import java.util.List;

/**
 * Created by romm on 28.02.17.
 */
@Service("springUserService")
@Qualifier("springUserServiceBean")
public class SpringUserService implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public void init() {
        userRepository.save(new User("Roma"));
        userRepository.save(new User("Vova"));
        userRepository.save(new User("Jura"));
        userRepository.save(new User("Geka"));
    }

    @Override
    public List<User> initTreasury(List<String> usernames) {
        List<User> users = new LinkedList<>();
        for (String username : usernames) {
            User u = new User(username);
            u = userRepository.save(u);
            users.add(u);
        }
        return users;
    }

    @Override
    public User getUserByID(Integer id) {
        return userRepository.findOne(id);
    }

    @Override
    public void createUser(User user) {
        userRepository.save(user);
    }

}
