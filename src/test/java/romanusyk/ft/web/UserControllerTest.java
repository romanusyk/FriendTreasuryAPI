package romanusyk.ft.web;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import romanusyk.ft.data.entity.User;
import romanusyk.ft.service.interfaces.UserService;

import static org.hamcrest.Matchers.is;
import static org.mockito.Matchers.anyInt;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Created by Roman Usyk on 06.09.17.
 */

@RunWith(SpringRunner.class)
@WebMvcTest(UserController.class)
@ActiveProfiles("test")
public class UserControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private UserService userService;

    @Test
    public void testGetUserByIdOnValidId() throws Exception {

        User roma = User.builder().
                username("roma").
                password("111").
                authorities("user").
                build();
        roma.setId(1);

        when(userService.getUserByID(roma.getId())).thenReturn(roma);

        mvc.perform(get("/api/v1/users/" + roma.getId())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username", is(roma.getUsername())));
    }

    @Test
    public void testGetUserByUsernameOnInvalidUsername() throws Exception {

        User roma = User.builder()
                .username("roma")
                .password("111")
                .authorities("user")
                .build();
        roma.setId(1);

        when(userService.getUserByID(anyInt())).thenReturn(null);

        mvc.perform(get("/api/v1/users/12345")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }
}
