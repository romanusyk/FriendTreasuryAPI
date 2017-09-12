package romanusyk.ft.service;

import romanusyk.ft.domain.Group;
import romanusyk.ft.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import romanusyk.ft.repository.GroupRepository;

/**
 * Created by romm on 29.08.17.
 */
@Service
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
