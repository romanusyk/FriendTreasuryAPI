package romanusyk.ft.service.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;
import romanusyk.ft.domain.Group;
import romanusyk.ft.domain.Payment;
import romanusyk.ft.domain.User;
import romanusyk.ft.repository.GroupRepository;
import romanusyk.ft.repository.PaymentRepository;
import romanusyk.ft.repository.UserRepository;
import romanusyk.ft.repository.UserExampleBuilder;
import romanusyk.ft.service.interfaces.DBInit;
import romanusyk.ft.service.interfaces.UserService;
import romanusyk.ft.utils.RandomString;

import java.math.BigDecimal;

/**
 * Created by Roman Usyk on 12.09.17.
 */
@Service
public class FromCodeDBInit implements DBInit {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @Autowired
    GroupRepository groupRepository;

    @Autowired
    PaymentRepository paymentRepository;

    @Override
    public void init() {

        RandomString randomString = new RandomString();

        Group guys = new Group("guys", randomString.nextString());
        Group universe = new Group("universe", randomString.nextString());

        groupRepository.save(guys);
        groupRepository.save(universe);

        User roma = new User("Roma","romanysik@gmail.com", "380952411401", "111", "user");
        User yura = new User("Yura","yuriikrat@gmail.com", "380960737750", "111", "user");
        User geka = new User("Geka","gekastephan@gmail.com", "380952411403", "111", "user");

        SpringUserService.encryptPassword(roma);
        SpringUserService.encryptPassword(yura);
        SpringUserService.encryptPassword(geka);

        userService.createUser(roma);
        userService.createUser(yura);
        userService.createUser(geka);

        guys.getUsers().add(roma);
        guys.getUsers().add(yura);
        guys.getUsers().add(geka);

        universe.getUsers().add(roma);
        universe.getUsers().add(yura);
        universe.getUsers().add(geka);

        roma.getGroups().add(guys);
        yura.getGroups().add(guys);
        geka.getGroups().add(guys);

        roma.getGroups().add(universe);
        yura.getGroups().add(universe);
        geka.getGroups().add(universe);

        groupRepository.save(guys);
        groupRepository.save(universe);

        Payment payment1 = new Payment(roma, yura, guys, new BigDecimal(100), "Test", 33.33, 6.66);
        Payment payment3 = new Payment(roma, yura, guys, new BigDecimal(300), "Test", 33.33, 6.66);
        Payment payment2 = new Payment(yura, roma, guys, new BigDecimal(200), "Test", 33.33, 6.66);

        Payment payment4 = new Payment(roma, yura, universe, new BigDecimal(100), "Test", 33.33, 6.66);
        Payment payment5 = new Payment(roma, yura, universe, new BigDecimal(300), "Test", 33.33, 6.66);
        Payment payment6 = new Payment(yura, roma, universe, new BigDecimal(200), "Test", 33.33, 6.66);
        Payment payment7 = new Payment(roma, geka, universe, new BigDecimal(200), "Test", 33.33, 6.66);

        paymentRepository.save(payment1);
        paymentRepository.save(payment2);
        paymentRepository.save(payment3);
        paymentRepository.save(payment4);
        paymentRepository.save(payment5);
        paymentRepository.save(payment6);
        paymentRepository.save(payment7);

        User userExample = new User();
        userExample.setEmail("romanysik@gmail.com");
        userExample.setUsername("Yura");

        UserExampleBuilder matcher = new UserExampleBuilder();
        Example<User> example = matcher.buildExistingUserExample(userExample);

        Iterable<User> users = userRepository.findAll(example);
        System.out.println("Users by example:");
        for (User u : users) {
            System.out.println(u.toDetailedString());
        }

    }
}
