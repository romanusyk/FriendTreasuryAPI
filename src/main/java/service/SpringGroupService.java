package service;

import domain.Group;
import domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repository.GroupRepository;

/**
 * Created by romm on 29.08.17.
 */
@Service("springGroupService")
public class SpringGroupService implements GroupService {

    @Autowired
    private GroupRepository groupRepository;

    @Override
    public void createGroup(String title, User creator) {
        Group group = new Group(title);
        group.getUsers().add(creator);
        groupRepository.save(group);
    }
}
