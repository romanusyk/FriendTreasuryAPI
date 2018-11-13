package romanusyk.ft.service.implementations;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Example;
import romanusyk.ft.data.entity.Group;
import romanusyk.ft.data.entity.User;
import org.springframework.stereotype.Service;
import romanusyk.ft.data.model.dto.UserStatistics;
import romanusyk.ft.exception.EntityAlreadyExistsException;
import romanusyk.ft.exception.EntityNotFoundException;
import romanusyk.ft.exception.EntityNotValidException;
import romanusyk.ft.repository.GroupRepository;
import romanusyk.ft.repository.PaymentRepository;
import romanusyk.ft.repository.UserExampleBuilder;
import romanusyk.ft.repository.UserRepository;
import romanusyk.ft.service.MD5Encrypter;
import romanusyk.ft.service.interfaces.UserService;

import java.lang.invoke.MethodHandles;
import java.math.BigDecimal;
import java.util.*;

/**
 * Created by romm on 28.02.17.
 */
@Service
@RequiredArgsConstructor
public class SpringUserService implements UserService {

    private final UserRepository userRepository;
    private final GroupRepository groupRepository;
    private final PaymentRepository paymentRepository;

    @Override
    public User getUserByID(Integer id) {
        return userRepository.findOne(id);
    }

    @Override
    public void checkIfExists(User user) {
        UserExampleBuilder builder = new UserExampleBuilder();
        Example<User> example = builder.buildExistingUserExample(user);
        Iterable<User> users = userRepository.findAll(example);
        Map<String, Integer> fieldCount = new HashMap<>();
        for (User u: users) {
            if (u.getUsername().equals(user.getUsername())) {
                fieldCount.computeIfAbsent("username", k -> 1);
            }
            if (u.getEmail().equals(user.getEmail())) {
                fieldCount.computeIfAbsent("email", k -> 1);
            }
            if (u.getPhone().equals(user.getPhone())) {
                fieldCount.computeIfAbsent("phone", k -> 1);
            }
        }
        if (!fieldCount.isEmpty()) {
            String[] result = new String[fieldCount.size()];
            throw new EntityAlreadyExistsException(
                    User.class,
                    fieldCount.keySet().toArray(result)
            );
        }
    }

    public static void encryptPassword(User u) {
        u.setPassword(MD5Encrypter.encrypt(u.getPassword()));
    }

    @Override
    public Integer createUser(User user) {
        checkIfExists(user);
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
            throw new EntityNotValidException("Attempt toCreation update user with null id");
        }

        User existingUser = userRepository.findOne(user.getId());

        if (existingUser == null) {
            throw new EntityNotValidException("Attempt toCreation update non-existing user by id: " + user.getId());
        }

        encryptPassword(user);

        existingUser.setUsername(user.getUsername());
        existingUser.setEmail(user.getEmail());
        existingUser.setPhone(user.getPhone());
        existingUser.setPassword(user.getPassword());
        existingUser.setCreditCard(user.getCreditCard());

        checkIfExists(existingUser);

        try {
            userRepository.save(existingUser);
        } catch (Exception e) {
            logger.error(e.getLocalizedMessage());
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public void addUserToGroup(Integer userID, String groupName) {
        User user = userRepository.findOne(userID);
        Group group = groupRepository.findByName(groupName);

        if (group == null) {
            throw new EntityNotFoundException(
                    Group.class,
                    Group.builder()
                            .title("unknown")
                            .name(groupName)
                            .build()
            );
        }

        if (!user.getGroups().contains(group)) {
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
    public void removeUserFromGroup(Integer userID, String groupName) {
        User user = userRepository.findOne(userID);
        Group group = groupRepository.findByName(groupName);

        if (group == null) {
            throw new EntityNotFoundException(
                    Group.class,
                    Group.builder()
                        .title("unknown")
                        .name(groupName)
                        .build()
            );
        }

        if (user.getGroups().contains(group)) {
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

    @Override
    public UserStatistics getUserStatistics(User client) {
        User u = userRepository.findOne(client.getId());
        BigDecimal userOutcome = paymentRepository.getUserOutcome(u);
        if (userOutcome == null) {
            userOutcome = new BigDecimal(0);
        }
        BigDecimal userIncome = paymentRepository.getUserIncome(u);
        if (userIncome == null) {
            userIncome = new BigDecimal(0);
        }
        return UserStatistics.builder().user(u).debt(userOutcome.subtract(userIncome)).build();
    }

    @Override
    public UserStatistics getUserStatistics(User client, Set<Group> groupSet) {
        User u = userRepository.findOne(client.getId());
        BigDecimal userOutcome = paymentRepository.getUserOutcomeInGroups(u, groupSet);
        if (userOutcome == null) {
            userOutcome = new BigDecimal(0);
        }
        BigDecimal userIncome = paymentRepository.getUserIncomeInGroups(u, groupSet);
        if (userIncome == null) {
            userIncome = new BigDecimal(0);
        }
        return UserStatistics.builder().user(u).debt(userOutcome.subtract(userIncome)).build();
    }

    private static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

}
