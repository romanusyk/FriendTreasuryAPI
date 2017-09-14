package romanusyk.ft.service;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import romanusyk.ft.domain.User;
import romanusyk.ft.repository.GroupRepository;
import romanusyk.ft.repository.UserRepository;

import java.util.Collections;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.nullValue;
import static org.hamcrest.core.IsEqual.equalTo;
import static org.hamcrest.core.IsNull.notNullValue;
import static org.mockito.Mockito.*;

/**
 * Created by Roman Usyk on 06.09.17.
 */
@RunWith(SpringRunner.class)
@TestPropertySource(
        locations = "classpath:application-integration-test.yml"
)
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
        roma = new User("12345", "roma", "111");
    }

    @Test
    public void testGetUserByUsernameOnValidUsername() {

        when(userRepository.findUserByUsername(roma.getUsername())).thenReturn(roma);

        User resultUser = userService.getUserByUsername(roma.getUsername());

        assertThat(resultUser, notNullValue());
        assertThat(resultUser.getUsername(), equalTo(roma.getUsername()));
    }

    @Test
    public void testGetUserByUsernameOnInvalidUsername() {

        when(userRepository.findUserByUsername(anyString())).thenReturn(null);

        User resultUser = userService.getUserByUsername(roma.getUsername());

        assertThat(resultUser, nullValue());
    }
}
