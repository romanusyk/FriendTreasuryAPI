package romanusyk.ft.service;

import romanusyk.ft.domain.Group;
import romanusyk.ft.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import romanusyk.ft.repository.GroupRepository;
import romanusyk.ft.repository.UserRepository;

import java.util.*;

/**
 * Created by romm on 28.02.17.
 */
@Service
public class SpringUserService implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    GroupRepository groupRepository;

    @Override
    public void init() {

        Group group = new Group("505");

        groupRepository.save(group);

        User roma = new User("380952411401", "Roma", "111");
        User jura = new User("380960737750", "Jura", "111");
        User geka = new User("380952411403", "Geka", "111");

        group.getUsers().add(roma);
        group.getUsers().add(jura);
        group.getUsers().add(geka);

        roma.getGroups().add(group);
        jura.getGroups().add(group);
        geka.getGroups().add(group);

        createUser(roma);
        createUser(jura);
        createUser(geka);

    }

    //    @Override
//    public List<User> initTreasury(List<String> usernames) {
//        List<User> users = new LinkedList<>();
//        for (String username : usernames) {
//            User u = new User(username);
//            u = userRepository.save(u);
//            users.add(u);
//        }
//        return users;
//    }

    @Override
    public User getUserByID(Integer id) {
        return userRepository.findOne(id);
    }

    @Override
    public void createUser(User user) {
        user.setPassword(MD5Encrypter.encrypt(user.getPassword()));
        userRepository.save(user);
    }

    @Override
    public User validateUser(User user) {
        User returnedUser = userRepository.findUserByUsername(user.getUsername());
        if (returnedUser == null) {
            return null;
        }
        return Objects.equals(returnedUser.getPassword(), MD5Encrypter.encrypt(user.getPassword())) ? returnedUser : null;
    }

    @Override
    public List<User> getAllUsers() {
        List<User> result = new LinkedList<>();
        userRepository.findAll().forEach(result::add);
        return result;
    }

    @Override
    public User getUserByUsername(String username) {
        return userRepository.findUserByUsername(username);
    }

}
