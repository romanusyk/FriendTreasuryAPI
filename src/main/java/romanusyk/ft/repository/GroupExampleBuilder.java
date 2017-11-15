package romanusyk.ft.repository;

import org.springframework.data.domain.Example;
import romanusyk.ft.domain.Group;

/**
 * Created by Roman Usyk on 15.11.17.
 */
public class GroupExampleBuilder {

    public Example<Group> buildExistingGroupExample(Group group) {
        Group exampleGroup = new Group();
        exampleGroup.setName(group.getName());
        return Example.of(exampleGroup);
    }

}
