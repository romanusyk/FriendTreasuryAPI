package romanusyk.ft.service;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureDataJpa;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import romanusyk.ft.FTApplication;
import romanusyk.ft.domain.Group;
import romanusyk.ft.domain.Payment;
import romanusyk.ft.domain.User;
import romanusyk.ft.repository.GroupRepository;
import romanusyk.ft.repository.UserRepository;
import romanusyk.ft.service.Optimizer;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Java6Assertions.assertThat;

/**
 * Created by Roman Usyk on 14.09.17.
 */
@RunWith(SpringRunner.class)
@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
        classes = FTApplication.class
)
@AutoConfigureMockMvc
@TestPropertySource(
        locations = "classpath:application-integration-test.yml"
)
public class DebtOptimizerTest {

    @Autowired private UserRepository userRepository;

    @Autowired private GroupRepository groupRepository;

    @Autowired
    private Optimizer optimizer;

    @Test
    public void testSumPayments() {

        Group group = new Group("groupTitle");
        User alice = new User("123", "Alice", "12345");
        User bob = new User("456", "Bob", "12345");
        User carol = new User("789", "Carol", "12345");

        groupRepository.save(group);
        userRepository.save(alice);
        userRepository.save(bob);
        userRepository.save(carol);

        List<Payment> payments = new ArrayList<>(9);

        payments.add(new Payment(alice, bob, group, new BigDecimal(100), "", 0., 0.));
        payments.add(new Payment(alice, bob, group, new BigDecimal(100), "", 0., 0.));
        payments.add(new Payment(alice, carol, group, new BigDecimal(100), "", 0., 0.));
        payments.add(new Payment(bob, alice, group, new BigDecimal(200), "", 0., 0.));
        payments.add(new Payment(bob, alice, group, new BigDecimal(200), "", 0., 0.));
        payments.add(new Payment(bob, carol, group, new BigDecimal(200), "", 0., 0.));
        payments.add(new Payment(bob, carol, group, new BigDecimal(200), "", 0., 0.));
        payments.add(new Payment(carol, alice, group, new BigDecimal(150), "", 0., 0.));
        payments.add(new Payment(carol, alice, group, new BigDecimal(150), "", 0., 0.));

        optimizer.sumPayments(payments, group.getId());
        Map<Integer, Map<Integer, BigDecimal>> actual = optimizer.getDebtMap();

        Integer aliceID = alice.getId();
        Integer bobID = bob.getId();
        Integer carolID = carol.getId();

        assertThat(actual.size()).isEqualTo(3);
        assertThat(actual.get(aliceID).size()).isEqualTo(2);
        assertThat(actual.get(bobID).size()).isEqualTo(2);
        assertThat(actual.get(carolID).size()).isEqualTo(1);
        assertThat(actual.get(aliceID).get(bobID)).isEqualTo(new BigDecimal(200));
        assertThat(actual.get(aliceID).get(carolID)).isEqualTo(new BigDecimal(100));
        assertThat(actual.get(bobID).get(aliceID)).isEqualTo(new BigDecimal(400));
        assertThat(actual.get(bobID).get(carolID)).isEqualTo(new BigDecimal(400));
        assertThat(actual.get(carolID).get(aliceID)).isEqualTo(new BigDecimal(300));
        assertThat(actual.get(carolID).get(bobID)).isNull();

        groupRepository.deleteAll();
        userRepository.deleteAll();

    }

    @Test
    public void testOptimizeDebtsOnOneCircle() {

        Group group = new Group("groupTitle");
        User alice = new User("123", "Alice", "12345");
        User bob = new User("456", "Bob", "12345");
        User carol = new User("789", "Carol", "12345");

        groupRepository.save(group);
        userRepository.save(alice);
        userRepository.save(bob);
        userRepository.save(carol);

        List<Payment> payments = new ArrayList<>(3);

        payments.add(new Payment(alice, bob, group, new BigDecimal(100), "", 0., 0.));
        payments.add(new Payment(bob, carol, group, new BigDecimal(200), "", 0., 0.));
        payments.add(new Payment(carol, alice, group, new BigDecimal(150), "", 0., 0.));

        optimizer.sumPayments(payments, group.getId());
        optimizer.optimizeDebts();
        Map<Integer, Map<Integer, BigDecimal>> actual = optimizer.getDebtMap();

        Integer aliceID = alice.getId();
        Integer bobID = bob.getId();
        Integer carolID = carol.getId();

        assertThat(actual.size()).isEqualTo(2);
        assertThat(actual.get(aliceID)).isNull();
        assertThat(actual.get(bobID).size()).isEqualTo(1);
        assertThat(actual.get(carolID).size()).isEqualTo(1);
        assertThat(actual.get(bobID).get(aliceID)).isNull();
        assertThat(actual.get(bobID).get(carolID)).isEqualTo(new BigDecimal(100));
        assertThat(actual.get(carolID).get(aliceID)).isEqualTo(new BigDecimal(50));
        assertThat(actual.get(carolID).get(bobID)).isNull();

        groupRepository.deleteAll();
        userRepository.deleteAll();

    }

    @Test
    public void testOptimizeDebtsOnSquare() {

        Group group = new Group("groupTitle");

        User alice = new User("123", "Alice", "12345");
        User bob = new User("456", "Bob", "12345");
        User carol = new User("789", "Carol", "12345");
        User dan = new User("147", "Dan", "12345");

        groupRepository.save(group);
        userRepository.save(alice);
        userRepository.save(bob);
        userRepository.save(carol);
        userRepository.save(dan);

        List<Payment> payments = new ArrayList<>(6);

        payments.add(new Payment(alice, bob, group, new BigDecimal(200), "", 0., 0.));
        payments.add(new Payment(bob, carol, group, new BigDecimal(100), "", 0., 0.));
        payments.add(new Payment(carol, alice, group, new BigDecimal(300), "", 0., 0.));

        payments.add(new Payment(bob, alice, group, new BigDecimal(100), "", 0., 0.));
        payments.add(new Payment(dan, bob, group, new BigDecimal(200), "", 0., 0.));
        payments.add(new Payment(alice, dan, group, new BigDecimal(150), "", 0., 0.));

        optimizer.sumPayments(payments, group.getId());
        optimizer.optimizeDebts();
        Map<Integer, Map<Integer, BigDecimal>> actual = optimizer.getDebtMap();

        Integer aliceID = alice.getId();
        Integer bobID = bob.getId();
        Integer carolID = carol.getId();
        Integer danID = dan.getId();

        assertThat(actual.size()).isEqualTo(3);
        assertThat(actual.get(bobID)).isNull();
        assertThat(actual.get(aliceID).get(danID)).isEqualTo(new BigDecimal(150));
        assertThat(actual.get(carolID).get(aliceID)).isEqualTo(new BigDecimal(200));
        assertThat(actual.get(danID).get(bobID)).isEqualTo(new BigDecimal(200));

        groupRepository.deleteAll();
        userRepository.deleteAll();

    }

}
