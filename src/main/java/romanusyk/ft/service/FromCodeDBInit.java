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
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @Autowired
    GroupRepository groupRepository;

    @Autowired
    PaymentRepository paymentRepository;

    @Override
    public void init() {

        Group group = new Group("505");

//        groupRepository.save(group);

        User roma = new User("380952411401", "Roma", "111");
        User jura = new User("380960737750", "Jura", "111");
        User geka = new User("380952411403", "Geka", "111");

        group.getUsers().add(roma);
        group.getUsers().add(jura);
        group.getUsers().add(geka);

        roma.getGroups().add(group);
        jura.getGroups().add(group);
        geka.getGroups().add(group);

//        userRepository.save(roma);
//        userRepository.save(jura);
//        userRepository.save(geka);

        userService.createUser(roma);
        userService.createUser(jura);
        userService.createUser(geka);

        Payment payment1 = new Payment(roma, jura, group, new BigDecimal(100), "Test", 33.33, 6.66);
        Payment payment2 = new Payment(jura, roma, group, new BigDecimal(200), "Test", 33.33, 6.66);
        Payment payment3 = new Payment(roma, jura, group, new BigDecimal(300), "Test", 33.33, 6.66);

        paymentRepository.save(payment1);
        paymentRepository.save(payment2);
        paymentRepository.save(payment3);

    }
}
