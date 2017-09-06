package romanusyk.ft.repository;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import romanusyk.ft.domain.User;
import romanusyk.ft.repository.UserRepository;

import java.lang.invoke.MethodHandles;

import static org.assertj.core.api.Java6Assertions.assertThat;

/**
 * Created by Roman Usyk on 06.09.17.
 */
@RunWith(SpringRunner.class)
@DataJpaTest
@TestPropertySource(
        locations = "classpath:application-integration-test.yml"
)
public class UserRepositoryTest {

    private static final Logger LOGGER = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private UserRepository userRepository;

    private User roma = null;

    @Before
    public void init() {
        roma = new User("12345", "Roma", "111");
        entityManager.persist(roma);
        entityManager.flush();
    }

    @Test
    public void testFindOne() {
        LOGGER.info("Getting user " + roma.toString());
        User user = userRepository.findOne(roma.getId());
        assertThat(roma.getUsername()).isEqualTo(user.getUsername());
    }

}
