package romanusyk.ft.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import romanusyk.ft.domain.Group;
import romanusyk.ft.domain.Payment;
import romanusyk.ft.domain.User;
import romanusyk.ft.repository.GroupRepository;
import romanusyk.ft.repository.PaymentRepository;
import romanusyk.ft.repository.UserRepository;

import java.math.BigDecimal;

/**
 * Created by Roman Usyk on 12.09.17.
 */
@Service
public class FromCodeDBInit implements DBInit {

    @Autowired
    UserService userService;

    @Autowired
    GroupRepository groupRepository;

    @Autowired
    PaymentRepository paymentRepository;

    @Override
    public void init() {

        Group guys = new Group("guys");
        Group universe = new Group("universe");

        groupRepository.save(guys);
        groupRepository.save(universe);

        User roma = new User("380952411401", "Roma", "111");
        User jura = new User("380960737750", "Jura", "111");
        User geka = new User("380952411403", "Geka", "111");

        userService.createUser(roma);
        userService.createUser(jura);
        userService.createUser(geka);

        guys.getUsers().add(roma);
        guys.getUsers().add(jura);
        guys.getUsers().add(geka);

        universe.getUsers().add(roma);
        universe.getUsers().add(jura);
        universe.getUsers().add(geka);

        roma.getGroups().add(guys);
        jura.getGroups().add(guys);
        geka.getGroups().add(guys);

        roma.getGroups().add(universe);
        jura.getGroups().add(universe);
        geka.getGroups().add(universe);

        groupRepository.save(guys);
        groupRepository.save(universe);

        Payment payment1 = new Payment(roma, jura, guys, new BigDecimal(100), "Test", 33.33, 6.66);
        Payment payment3 = new Payment(roma, jura, guys, new BigDecimal(300), "Test", 33.33, 6.66);
        Payment payment2 = new Payment(jura, roma, guys, new BigDecimal(200), "Test", 33.33, 6.66);

        Payment payment4 = new Payment(roma, jura, universe, new BigDecimal(100), "Test", 33.33, 6.66);
        Payment payment5 = new Payment(jura, geka, universe, new BigDecimal(300), "Test", 33.33, 6.66);
        Payment payment6 = new Payment(geka, roma, universe, new BigDecimal(200), "Test", 33.33, 6.66);

        paymentRepository.save(payment1);
        paymentRepository.save(payment2);
        paymentRepository.save(payment3);
        paymentRepository.save(payment4);
        paymentRepository.save(payment5);
        paymentRepository.save(payment6);

    }
}
