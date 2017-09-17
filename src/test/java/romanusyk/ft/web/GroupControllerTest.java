package romanusyk.ft.web;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.mock.http.MockHttpOutputMessage;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import romanusyk.ft.domain.Group;
import romanusyk.ft.exception.EntityNotValidException;
import romanusyk.ft.service.interfaces.GroupService;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.Arrays;

import static org.assertj.core.api.Java6Assertions.assertThat;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.nullValue;
import static org.junit.Assert.assertNotNull;
import static org.mockito.Matchers.any;
import static org.mockito.Matchers.eq;
import static org.mockito.Matchers.isNull;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Created by Roman Usyk on 16.09.17.
 */
@RunWith(SpringRunner.class)
@WebMvcTest(GroupController.class)
@ActiveProfiles("test")
public class GroupControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    GroupService groupService;

    private MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
            MediaType.APPLICATION_JSON.getSubtype(),
            Charset.forName("utf8"));

    private HttpMessageConverter mappingJackson2HttpMessageConverter;

    @Autowired
    void setConverters(HttpMessageConverter<?>[] converters) {

        this.mappingJackson2HttpMessageConverter = Arrays.stream(converters)
                .filter(hmc -> hmc instanceof MappingJackson2HttpMessageConverter)
                .findAny()
                .orElse(null);

        assertNotNull("the JSON message converter must not be null",
                this.mappingJackson2HttpMessageConverter);
    }

    @Test
    public void testCreateGroupOnValidGroup() throws Exception {

        Group group = new Group("testGroup");

        when(groupService.createGroup(any(), eq(null))).thenReturn(1);

        mvc.perform(post("/api/v1/groups/")
                .header("Authorization", "dsdfsf")
                .content(this.json(group))
                .contentType(contentType))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(1)));

    }

    @Test
    public void testCreateGroupOnInvalidData() throws Exception {

        Group group = new Group("testGroup");
        group.setId(1);

        when(groupService.createGroup(any(), any())).thenThrow(new EntityNotValidException(""));

        mvc.perform(post("/api/v1/groups/")
                .header("Authorization", "dsdfsf")
                .content(this.json(group))
                .contentType(contentType))
                .andExpect(status().isBadRequest());

    }

    protected String json(Object o) throws IOException {
        MockHttpOutputMessage mockHttpOutputMessage = new MockHttpOutputMessage();
        this.mappingJackson2HttpMessageConverter.write(
                o, MediaType.APPLICATION_JSON, mockHttpOutputMessage);
        return mockHttpOutputMessage.getBodyAsString();
    }
}
