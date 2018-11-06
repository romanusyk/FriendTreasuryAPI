package romanusyk.ft;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.mock.http.MockHttpInputMessage;
import org.springframework.mock.http.MockHttpOutputMessage;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import romanusyk.ft.domain.Group;
import romanusyk.ft.domain.Payment;
import romanusyk.ft.domain.PaymentDTO;
import romanusyk.ft.domain.User;
import romanusyk.ft.repository.GroupRepository;
import romanusyk.ft.repository.PaymentRepository;
import romanusyk.ft.repository.UserRepository;
import romanusyk.ft.security.JwtAccessToken;
import romanusyk.ft.service.interfaces.DBInit;

import java.io.IOException;
import java.lang.invoke.MethodHandles;
import java.math.BigDecimal;
import java.nio.charset.Charset;
import java.util.Arrays;
import java.util.Date;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Created by Roman Usyk on 06.09.17.
 */
@RunWith(SpringRunner.class)
@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
        classes = FTApplication.class
)
@AutoConfigureMockMvc
@ActiveProfiles("test")
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class SimpleIntegrationTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private DBInit dbInit;

    private MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
            MediaType.APPLICATION_JSON.getSubtype(),
            Charset.forName("utf8"));


    @Before
    public void setUp() {
        dbInit.init();
    }

    @Test
    public void testGetUserByIdOnValidId() throws Exception {

        User roma = userRepository.findUserByUsername("Roma");

        mvc.perform(get("/api/v1/users/" + roma.getId())
                .contentType(contentType))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username", is(roma.getUsername())));
    }

    // =====================
    // ===    Payment    ===
    // =====================

    @Test
    public void testMakePaymentOnValidData() throws Exception {

        User roma = userRepository.findUserByUsername("Roma");
        User yura = userRepository.findUserByUsername("Yura");
        User geka = userRepository.findUserByUsername("Geka");

        // TODO:
        Group group = new Group();//groupRepository.findByTitle("guys");

        String s = this.json(new User("123", "Roma", "111", ""));

        logger.warn(s);

        JwtAccessToken token = (JwtAccessToken) fromJson(
                JwtAccessToken.class,
                mvc.perform(post("/api/v1/users/access/")
                    .content(s)
                    .contentType(contentType))
                    .andReturn()
                    .getResponse()
                    .getContentAsByteArray()
        );
        PaymentDTO paymentDTO = new PaymentDTO(
                roma.getId(),
                new Integer[]{yura.getId(), geka.getId()},
                group.getId(),
                new BigDecimal(500),
                1,
                "Test",
                new Date(),
                10.,
                10.
        );

        mvc.perform(post("/api/v1/payments/")
                .header("Authorization", token.getToken())
                .content(this.json(paymentDTO))
                .contentType(contentType))
                .andExpect(status().isOk());

    }

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

    protected String json(Object o) throws IOException {
        MockHttpOutputMessage mockHttpOutputMessage = new MockHttpOutputMessage();
        this.mappingJackson2HttpMessageConverter.write(
                o, MediaType.APPLICATION_JSON, mockHttpOutputMessage);
        return mockHttpOutputMessage.getBodyAsString();
    }

    protected Object fromJson(Class clazz, byte[] bytes) throws IOException {
        logger.warn("WARN------------------------");
        logger.warn(new String(bytes));
        MockHttpInputMessage mockHttpInputMessage = new MockHttpInputMessage(bytes);
        return this.mappingJackson2HttpMessageConverter.read(clazz, mockHttpInputMessage);
    }

    private static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

}
