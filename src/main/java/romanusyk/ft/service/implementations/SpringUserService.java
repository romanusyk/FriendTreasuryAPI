package romanusyk.ft.service.implementations;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import romanusyk.ft.domain.Group;
import romanusyk.ft.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import romanusyk.ft.exception.EntityIdNotValidException;
import romanusyk.ft.exception.EntityNotValidException;
import romanusyk.ft.repository.GroupRepository;
import romanusyk.ft.repository.UserRepository;
import romanusyk.ft.service.MD5Encrypter;
import romanusyk.ft.service.interfaces.UserService;

import java.lang.invoke.MethodHandles;
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
    public User getUserByID(Integer id) {
        return userRepository.findOne(id);
    }

    public static void encryptPassword(User u) {
        u.setPassword(MD5Encrypter.encrypt(u.getPassword()));
    }

    @Override
    public Integer createUser(User user) {
        return userRepository.save(user).getId();
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

    @Override
    public void updateUser(User user) {

        if (user.getId() == null) {
            throw new EntityNotValidException("Attempt to update user with null id");
        }

        User existingUser = userRepository.findOne(user.getId());

        if (existingUser == null) {
            throw new EntityNotValidException("Attempt to update non-existing user by id: " + user.getId());
        }

        encryptPassword(user);

        existingUser.setPhone(user.getPhone());
        existingUser.setUsername(user.getUsername());
        existingUser.setPassword(user.getPassword());

        try {
            userRepository.save(existingUser);
        } catch (Exception e) {
            logger.error(e.getLocalizedMessage());
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public void addUserToGroup(Integer userID, Integer groupID) {
        User user = userRepository.findOne(userID);
        Group group = groupRepository.findOne(groupID);

        if (group == null) {
            throw new EntityIdNotValidException(Group.class, groupID);
        }

        if (!user.getGroups().contains(group)) {
//            user.getGroups().add(group);
//            userRepository.save(user);
            group.getUsers().add(user);
            groupRepository.save(group);
        } else {
            throw new EntityNotValidException(String.format(
                    "User %s is already in group %s.",
                    user.toString(),
                    group.toString()
            ));
        }
    }

    @Override
    public void removeUserFromGroup(Integer userID, Integer groupID) {
        User user = userRepository.findOne(userID);
        Group group = groupRepository.findOne(groupID);

        if (group == null) {
            throw new EntityIdNotValidException(Group.class, groupID);
        }

        if (user.getGroups().contains(group)) {
//            user.getGroups().remove(group);
//            userRepository.save(user);
            group.getUsers().remove(user);
            groupRepository.save(group);
        } else {
            throw new EntityNotValidException(String.format(
                    "User %s is not a member of group %s.",
                    user.toString(),
                    group.toString()
            ));
        }
    }

    private static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

}
