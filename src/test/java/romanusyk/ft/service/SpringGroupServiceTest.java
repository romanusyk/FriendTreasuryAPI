package romanusyk.ft.service;

import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import romanusyk.ft.domain.Group;
import romanusyk.ft.exception.NotValidEntityException;
import romanusyk.ft.repository.GroupRepository;

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

        Group group = new Group("testGroup");

        when(groupRepository.save(group)).then(invocationOnMock -> {
            group.setId(1);
            return group;
        });

        Integer groupID = groupService.createGroup(group, null);

        assertThat(groupID).isEqualTo(1);

    }

    @Test(expected = NotValidEntityException.class)
    public void testCreateGroupOnGroupWithId() {

        Group group = new Group("testGroup");
        group.setId(1);

        groupService.createGroup(group, null);

    }
}
