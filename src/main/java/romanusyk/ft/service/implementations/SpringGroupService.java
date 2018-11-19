package romanusyk.ft.service.implementations;

import lombok.RequiredArgsConstructor;
import org.hibernate.exception.ConstraintViolationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import romanusyk.ft.data.entity.Group;
import romanusyk.ft.data.entity.User;
import org.springframework.stereotype.Service;
import romanusyk.ft.data.model.dto.GroupAdvancedDTO;
import romanusyk.ft.data.model.dto.GroupDTO;
import romanusyk.ft.data.model.dto.UserStatistics;
import romanusyk.ft.exception.EntityAlreadyExistsException;
import romanusyk.ft.exception.EntityNotValidException;
import romanusyk.ft.exception.UserPermissionsException;
import romanusyk.ft.repository.GroupRepository;
import romanusyk.ft.service.interfaces.GroupService;
import romanusyk.ft.service.interfaces.UserService;
import romanusyk.ft.utils.RandomString;
import romanusyk.ft.utils.converter.GroupAdvancedConverter;
import romanusyk.ft.utils.converter.GroupConverter;

import java.lang.invoke.MethodHandles;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Created by romm on 29.08.17.
 */
@Service
@RequiredArgsConstructor
public class SpringGroupService implements GroupService {

    private final GroupRepository groupRepository;
    private final UserService userService;

    @Override
    public GroupDTO createGroup(GroupDTO groupDTO, User client) {

        if (groupDTO.getId() != null) {
            throw new EntityNotValidException(
                    String.format(
                            "Attempt to create group \"%s\" with non-empty id: %d",
                            groupDTO.getTitle(),
                            groupDTO.getId()
                    )
            );
        }

        if (client == null) {
            logger.error(String.format("Creating new Group \"%s\" without an owner", groupDTO.getTitle()));
        }

        if (groupDTO.getName() != null) {
            throw new EntityNotValidException(
                    String.format(
                            "Attempt to create group \"%s\" with non null name.",
                            groupDTO.getName()
                    )
            );
        }

        Group group = GroupConverter.from(groupDTO);
        group.getUsers().add(client);
        group.setName(new RandomString().nextString());

        groupRepository.save(group);

        return GroupConverter.to(group);
    }

    @Override
    public GroupDTO updateGroup(GroupDTO groupDTO, User client) {

        if (groupDTO.getId() == null) {
            throw new EntityNotValidException("Attempt to update group with null id");
        }

        Group existingGroup = groupRepository.findOne(groupDTO.getId());

        if (existingGroup == null) {
            throw new EntityNotValidException("Attempt to update non-existing group by id: " + groupDTO.getId());
        }

        User user = userService.getUserByID(client.getId());
        if (!user.getGroups().contains(existingGroup)) {
            logger.debug(String.format(
                    "Access denied for user %d trying to modify group %s",
                    client.getId(),
                    existingGroup.toString()
            ));
            throw new UserPermissionsException("Group can be modified only by its participants.");
        }

        existingGroup.updateIfPresent(groupDTO.getName(), groupDTO.getTitle());

        groupRepository.save(existingGroup);

        return GroupConverter.to(existingGroup);
    }

    @Override
    public List<GroupDTO> getGroupsByUser(User client) {
        return getGroupListByUser(client).stream().map(GroupConverter::to).collect(Collectors.toList());
    }

    @Override
    public List<GroupAdvancedDTO> getGroupsByUserWithMeta(User client) {

        List<Group> groupList = getGroupListByUser(client);

        List<GroupAdvancedDTO> groupDTOList = new LinkedList<>();
        for (Group group: groupList) {
            Set<Group> groupSet = new HashSet<>();
            groupSet.add(group);
            UserStatistics userStatistics = userService.getUserStatistics(client, groupSet);
            GroupAdvancedDTO groupDTO = GroupAdvancedConverter.to(group, userStatistics.getDebt());
            groupDTOList.add(groupDTO);
        }

        return groupDTOList;
    }

    private List<Group> getGroupListByUser(User client) {
        User existingUser = userService.getUserByID(client.getId());
        return new ArrayList<>(existingUser.getGroups());
    }

    @Override
    public GroupDTO getGroupById(Integer groupID) {
        return GroupConverter.to(groupRepository.findOne(groupID));
    }

    @Override
    public GroupDTO getGroupByName(String groupName) {
        return GroupConverter.to(groupRepository.findByName(groupName));
    }

    private static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

}
