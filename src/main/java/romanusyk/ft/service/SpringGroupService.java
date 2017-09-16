package romanusyk.ft.service;

import org.hibernate.HibernateException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import romanusyk.ft.domain.Group;
import romanusyk.ft.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import romanusyk.ft.exception.NotValidEntityException;
import romanusyk.ft.repository.GroupRepository;
import romanusyk.ft.repository.UserRepository;

import java.lang.invoke.MethodHandles;
import java.util.ArrayList;
import java.util.Collections;
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
    public Integer createGroup(Group group, User creator) {

        if (group.getId() != null) {
            throw new NotValidEntityException(
                    String.format(
                            "Attempt to create group \"%s\" with non-empty id: %d",
                            group.getTitle(),
                            group.getId()
                    )
            );
        }

        if (!group.getUsers().isEmpty()) {
            throw new NotValidEntityException(
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

        try {
            groupRepository.save(group);
        } catch (Exception e) {
            logger.error(e.getLocalizedMessage());
            throw new RuntimeException(e.getMessage());
        }

        return group.getId();

    }

    @Override
    public void updateGroup(Group group) {

        if (group.getId() == null) {
            throw new NotValidEntityException("Attempt to update group with null id");
        }

        Group existingGroup = groupRepository.findOne(group.getId());

        if (existingGroup == null) {
            throw new NotValidEntityException("Attempt to update non-exising group by id: " + group.getId());
        }

        existingGroup.setTitle(group.getTitle());

        try {
            groupRepository.save(existingGroup);
        } catch (Exception e) {
            logger.error(e.getLocalizedMessage());
            throw new RuntimeException(e.getMessage());
        }

    }

    @Override
    public List<Group> getGroupsByUser(User user) {
        User existingUser = userRepository.findOne(user.getId());
        return new ArrayList<>(existingUser.getGroups());
    }

    @Override
    public Group getGroupByTitle(String groupTitle) {
        return groupRepository.findByTitle(groupTitle);
    }

    private static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

}
