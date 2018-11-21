package romanusyk.ft.service;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import romanusyk.ft.data.entity.User;
import romanusyk.ft.data.model.dto.UserDTO;
import romanusyk.ft.repository.GroupRepository;
import romanusyk.ft.repository.UserRepository;
import romanusyk.ft.service.implementations.SpringUserService;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.nullValue;
import static org.hamcrest.core.IsEqual.equalTo;
import static org.hamcrest.core.IsNull.notNullValue;
import static org.mockito.Mockito.*;

/**
 * Created by Roman Usyk on 06.09.17.
 */
@RunWith(SpringRunner.class)
@ActiveProfiles("test")
public class SpringUserServiceTest {

    @InjectMocks
    private SpringUserService userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private GroupRepository groupRepository;

    private User roma;

    @Before
    public void setUp() {
        roma = User.builder()
                .username("roma")
                .password("111")
                .authorities("user")
                .build();
    }

    @Test
    public void testGetUserByUsernameOnValidUsername() {

        when(userRepository.findUserByUsername(roma.getUsername())).thenReturn(roma);

        UserDTO resultUser = userService.getUserByUsername(roma.getUsername());

        assertThat(resultUser, notNullValue());
        assertThat(resultUser.getUsername(), equalTo(roma.getUsername()));
    }

    @Test
    public void testGetUserByUsernameOnInvalidUsername() {

        when(userRepository.findUserByUsername(anyString())).thenReturn(null);

        UserDTO resultUser = userService.getUserByUsername(roma.getUsername());

        assertThat(resultUser, nullValue());
    }
}
