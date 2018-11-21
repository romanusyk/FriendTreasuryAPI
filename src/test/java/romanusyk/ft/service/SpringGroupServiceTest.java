package romanusyk.ft.service;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import romanusyk.ft.data.entity.Group;
import romanusyk.ft.data.model.dto.GroupDTO;
import romanusyk.ft.exception.EntityNotValidException;
import romanusyk.ft.repository.GroupRepository;
import romanusyk.ft.service.implementations.SpringGroupService;
import romanusyk.ft.utils.converter.GroupConverter;

import static org.assertj.core.api.Java6Assertions.assertThat;
import static org.mockito.Mockito.when;

/**
 * Created by Roman Usyk on 16.09.17.
 */
@RunWith(SpringRunner.class)
@ActiveProfiles("test")
public class SpringGroupServiceTest {

    @InjectMocks
    private SpringGroupService groupService;

    @Mock
    private GroupRepository groupRepository;

    @Test
    public void testCreateGroupOnValidGroup() {

        // TODO:
        Group group = Group.builder().title("testGroup").name("").build();
        GroupDTO groupDTO = GroupConverter.to(group);

        when(groupRepository.save(group)).then(invocationOnMock -> {
            group.setId(1);
            return group;
        });

        GroupDTO resultGroup = groupService.createGroup(groupDTO, null);

        assertThat(resultGroup.getId()).isEqualTo(1);

    }

    @Test(expected = EntityNotValidException.class)
    public void testCreateGroupOnGroupWithId() {

        // TODO:
        GroupDTO group = GroupConverter.to(Group.builder().id(1).title("testGroup").name("").build());

        groupService.createGroup(group, null);

    }
}
