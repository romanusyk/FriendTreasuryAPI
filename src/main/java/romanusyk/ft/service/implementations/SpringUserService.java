package romanusyk.ft.service.implementations;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Example;
import romanusyk.ft.data.entity.Group;
import romanusyk.ft.data.entity.User;
import org.springframework.stereotype.Service;
import romanusyk.ft.data.model.dto.UserDTO;
import romanusyk.ft.data.model.dto.UserStatistics;
import romanusyk.ft.exception.EntityAlreadyExistsException;
import romanusyk.ft.exception.EntityNotFoundException;
import romanusyk.ft.exception.EntityNotValidException;
import romanusyk.ft.exception.UserPermissionsException;
import romanusyk.ft.repository.GroupRepository;
import romanusyk.ft.repository.PaymentRepository;
import romanusyk.ft.utils.db.UserExampleBuilder;
import romanusyk.ft.repository.UserRepository;
import romanusyk.ft.service.MD5Encrypter;
import romanusyk.ft.service.interfaces.UserService;
import romanusyk.ft.utils.Mappable;
import romanusyk.ft.utils.converter.UserConverter;

import java.lang.invoke.MethodHandles;
import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

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
    public UserDTO getUserDTOByID(Integer id) {
        return UserConverter.to(getUserByID(id));
    }

    public static void encryptPassword(User u) {
        u.setPassword(MD5Encrypter.encrypt(u.getPassword()));
    }

    @Override
    public User createUser(User user) {
        user.setAuthorities("user");
        SpringUserService.encryptPassword(user);
        return userRepository.save(user);
    }

    @Override
    public UserDTO createUserFromDTO(UserDTO userDTO) {
        checkIfUserNotExist(userDTO);
        User user = createUser(UserConverter.from(userDTO));
        return UserConverter.to(user);
    }

    @Override
    public UserDTO validateUser(UserDTO user) {
        User returnedUser = userRepository.findUserByUsername(user.getUsername());
        if (returnedUser == null) {
            return null;
        }
        if (!Objects.equals(returnedUser.getPassword(), MD5Encrypter.encrypt(user.getPassword()))) {
            return null;
        }
        return UserConverter.to(returnedUser);
    }

    @Override
    public List<User> getAllUsers() {
        List<User> result = new LinkedList<>();
        userRepository.findAll().forEach(result::add);
        return result;
    }

    @Override
    public List<UserDTO> getAllUsersDTO() {
        return getAllUsers().stream().map(UserConverter::to).collect(Collectors.toList());
    }

    @Override
    public List<UserDTO> getUsersInGroup(Integer groupId, UserDTO client) {
        Group group = groupRepository.findOne(groupId);
        if (group == null) {
            throw new EntityNotFoundException(Group.class, groupId);
        }
        if (!group.getUsers().contains(UserConverter.from(client))) {
            logger.debug(String.format(
                    "Access denied for user %s trying to get users of group %s",
                    client.getUsername(), group.getTitle()
            ));
            throw new UserPermissionsException("Group members are available only for its members.");
        }
        return group.getUsers().stream().map(UserConverter::to).collect(Collectors.toList());
    }

    @Override
    public UserDTO getUserByUsername(String username) {
        return UserConverter.to(userRepository.findUserByUsername(username));
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

        existingUser.updateIfPresent(
                user.getUsername(),
                user.getEmail(),
                user.getPhone(),
                user.getPassword(),
                user.getCreditCard()
        );

        userRepository.save(existingUser);
    }

    @Override
    public void updateUser(UserDTO userDTO, UserDTO creatorDTO) {
        User user = UserConverter.from(userDTO);
        User creator = UserConverter.from(creatorDTO);
        if (!user.equals(creator)) {
            logger.debug(String.format(
                    "Access denied for user %s trying to modify user %s",
                    creatorDTO.getUsername(),
                    user.getUsername()
            ));
            throw new UserPermissionsException();
        }
        checkIfUserNotExist(userDTO);
        createUser(user);
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
        BigDecimal userIncome = paymentRepository.getUserIncome(u);
        return UserStatistics.builder()
                .user(u)
                .debt(getUserDebt(userOutcome, userIncome))
                .build();
    }

    @Override
    public UserStatistics getUserStatisticsByDTO(UserDTO client) {
        return getUserStatistics(UserConverter.from(client));
    }

    @Override
    public UserStatistics getUserStatistics(User client, Set<Group> groupSet) {
        User u = userRepository.findOne(client.getId());
        BigDecimal userOutcome = paymentRepository.getUserOutcomeInGroups(u, groupSet);
        BigDecimal userIncome = paymentRepository.getUserIncomeInGroups(u, groupSet);
        return UserStatistics.builder()
                .user(u)
                .debt(getUserDebt(userOutcome, userIncome))
                .build();
    }

    @Override
    public void checkIfUserNotExist(UserDTO userDTO) {
        User user = UserConverter.from(userDTO);

        UserExampleBuilder builder = new UserExampleBuilder();
        Example<User> example = builder.buildExistingUserExample(user);
        Iterable<User> users = userRepository.findAll(example);

        List<Mappable> userList = new LinkedList<>();
        users.forEach(userList::add);
        String[] conflictFields = user.checkObjectIsNotPresentInList(
                user,
                userList,
                "username", "email", "phone"
        );
        if (conflictFields.length > 0) {
            throw new EntityAlreadyExistsException(
                    User.class,
                    conflictFields
            );
        }
    }

    private static BigDecimal getUserDebt(BigDecimal userOutcome, BigDecimal userIncome) {
        if (userOutcome == null) {
            userOutcome = BigDecimal.ZERO;
        }
        if (userIncome == null) {
            userIncome = BigDecimal.ZERO;
        }
        return userOutcome.subtract(userIncome);
    }

    private static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

}
