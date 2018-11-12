package romanusyk.ft.service.implementations;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import romanusyk.ft.data.entity.Group;
import romanusyk.ft.data.entity.Payment;
import romanusyk.ft.data.entity.User;
import romanusyk.ft.repository.GroupRepository;
import romanusyk.ft.repository.PaymentRepository;
import romanusyk.ft.repository.UserRepository;
import romanusyk.ft.service.interfaces.DBInit;
import romanusyk.ft.service.interfaces.UserService;
import romanusyk.ft.utils.RandomString;

import java.math.BigDecimal;

/**
 * Created by Roman Usyk on 12.09.17.
 */
@Service
@RequiredArgsConstructor
public class FromCodeDBInit implements DBInit {

    private final UserRepository userRepository;
    private final UserService userService;
    private final GroupRepository groupRepository;
    private final PaymentRepository paymentRepository;

    @Override
    public void init() {

        RandomString randomString = new RandomString();

        Group guys = Group.builder()
                .title("test1")
                .name(randomString.nextString())
                .build();
        Group universe = Group.builder()
                .title("test2")
                .name(randomString.nextString())
                .build();

        groupRepository.save(guys);
        groupRepository.save(universe);

        User roma = User.builder()
                .username("ro")
                .email("ro@gmail.com")
                .password("111")
                .authorities("user")
                .build();
        User yura = User.builder()
                .username("yu")
                .email("yu@gmail.com")
                .password("111")
                .authorities("user")
                .build();
        User geka = User.builder()
                .username("ge")
                .email("ge@gmail.com")
                .password("111")
                .authorities("user")
                .build();

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

        Payment payment1 = Payment.builder()
                .userFrom(roma)
                .userTo(yura)
                .group(guys)
                .amount(new BigDecimal(100))
                .description("Test")
                .build();
        Payment payment2 = Payment.builder()
                .userFrom(roma)
                .userTo(yura)
                .group(guys)
                .amount(new BigDecimal(300))
                .description("Test")
                .build();
        Payment payment3 = Payment.builder()
                .userFrom(yura)
                .userTo(roma)
                .group(guys)
                .amount(new BigDecimal(200))
                .description("Test")
                .build();

        Payment payment4 = Payment.builder()
                .userFrom(roma)
                .userTo(yura)
                .group(universe)
                .amount(new BigDecimal(100))
                .description("Test")
                .build();
        Payment payment5 = Payment.builder()
                .userFrom(roma)
                .userTo(yura)
                .group(universe)
                .amount(new BigDecimal(300))
                .description("Test")
                .build();
        Payment payment6 = Payment.builder()
                .userFrom(yura)
                .userTo(roma)
                .group(universe)
                .amount(new BigDecimal(200))
                .description("Test")
                .build();
        Payment payment7 = Payment.builder()
                .userFrom(roma)
                .userTo(geka)
                .group(universe)
                .amount(new BigDecimal(200))
                .description("Test")
                .build();

        paymentRepository.save(payment1);
        paymentRepository.save(payment2);
        paymentRepository.save(payment3);
        paymentRepository.save(payment4);
        paymentRepository.save(payment5);
        paymentRepository.save(payment6);
        paymentRepository.save(payment7);

    }
}
