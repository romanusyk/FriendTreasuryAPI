package romanusyk.ft.service.implementations;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Example;
import romanusyk.ft.domain.Group;
import romanusyk.ft.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import romanusyk.ft.exception.EntityAlreadyExistsException;
import romanusyk.ft.exception.EntityNotValidException;
import romanusyk.ft.repository.GroupExampleBuilder;
import romanusyk.ft.repository.GroupRepository;
import romanusyk.ft.repository.UserRepository;
import romanusyk.ft.service.interfaces.GroupService;
import romanusyk.ft.utils.RandomString;

import java.lang.invoke.MethodHandles;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by romm on 29.08.17.
 */
@Service
public class SpringGroupService implements GroupService {

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public void checkIfExists(Group group) {
        GroupExampleBuilder builder = new GroupExampleBuilder();
        Example<Group> example = builder.buildExistingGroupExample(group);
        Iterable<Group> groups = groupRepository.findAll(example);
        if (!groups.iterator().hasNext()) {
            throw new EntityAlreadyExistsException(
                    Group.class,
                    new String[]{"name"}
            );
        }
    }

    @Override
    public Group createGroup(Group group, User creator) {

        if (group.getId() != null) {
            throw new EntityNotValidException(
                    String.format(
                            "Attempt to create group \"%s\" with non-empty id: %d",
                            group.getTitle(),
                            group.getId()
                    )
            );
        }

        if (!group.getUsers().isEmpty()) {
            throw new EntityNotValidException(
                    String.format(
                            "Attempt to create group \"%s\" with non-empty set of users.",
                            group.getTitle()
                    )
            );
        }

        if (creator == null) {
            logger.error(String.format("Creating new Group \"%s\" without an owner", group.getTitle()));
        } else {
            group.getUsers().add(creator);
        }

        if (group.getName() != null) {
            throw new EntityNotValidException(
                    String.format(
                            "Attempt to create group \"%s\" with non null name.",
                            group.getName()
                    )
            );
        } else {
            RandomString randomString = new RandomString();
            group.setName(randomString.nextString());
        }

        try {
            groupRepository.save(group);
        } catch (Exception e) {
            logger.error(e.getLocalizedMessage());
            throw new RuntimeException(e.getMessage());
        }

        return group;

    }

    @Override
    public Group updateGroup(Group group) {

        if (group.getId() == null) {
            throw new EntityNotValidException("Attempt to update group with null id");
        }

        Group existingGroup = groupRepository.findOne(group.getId());

        if (existingGroup == null) {
            throw new EntityNotValidException("Attempt to update non-existing group by id: " + group.getId());
        }

        existingGroup.updateFromInstance(group);

        checkIfExists(existingGroup);

        try {
            groupRepository.save(existingGroup);
        } catch (Exception e) {
            logger.error(e.getLocalizedMessage());
            throw new RuntimeException(e.getMessage());
        }

        return existingGroup;

    }

    @Override
    public List<Group> getGroupsByUser(User user) {
        User existingUser = userRepository.findOne(user.getId());
        return new ArrayList<>(existingUser.getGroups());
    }

    @Override
    public Group getGroupById(Integer groupID) {
        return groupRepository.findOne(groupID);
    }

    @Override
    public Group getGroupByName(String groupName) {
        return groupRepository.findByName(groupName);
    }

    private static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

}
