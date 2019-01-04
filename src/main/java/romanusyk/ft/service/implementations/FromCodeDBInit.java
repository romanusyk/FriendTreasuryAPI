package romanusyk.ft.service.implementations;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import romanusyk.ft.data.entity.*;
import romanusyk.ft.repository.*;
import romanusyk.ft.service.interfaces.DBInit;
import romanusyk.ft.service.interfaces.UserService;
import romanusyk.ft.utils.RandomString;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;

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
    private final EventRepository eventRepository;
    private final ShareRepository shareRepository;

    @Value("${ft.initdb}")
    private Boolean initDB;

    @Override
    public void init() {

        if (!initDB) {
            return;
        }

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
                .build();
        User yura = User.builder()
                .username("yu")
                .email("yu@gmail.com")
                .password("111")
                .build();
        User geka = User.builder()
                .username("ge")
                .email("ge@gmail.com")
                .password("111")
                .build();

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

        Event food = new Event(
                null,
                universe,
                EventState.CHILD,
                new HashSet<>(),
                new HashSet<>(),
                "Food",
                new Date().getTime(),
                new Location(0, 0, ""),
                new Date().getTime(),
                roma,
                new HashSet<User>(){{add(roma); add(yura); add(geka);}}
        );

        Event wine = new Event(
                null,
                universe,
                EventState.CHILD,
                new HashSet<>(),
                new HashSet<>(),
                "Wine",
                new Date().getTime(),
                new Location(0, 0, ""),
                new Date().getTime(),
                null,
                new HashSet<User>(){{add(roma); add(yura); add(geka);}}
        );

        Event party = new Event(
                null,
                universe,
                EventState.CREATED,
                new HashSet<Event>(){{add(food); add(wine);}},
                new HashSet<>(),
                "Party",
                new Date().getTime(),
                null,
                new Date().getTime(),
                geka,
                new HashSet<User>(){{add(roma); add(yura); add(geka);}}
        );

//        eventRepository.save(party);

        Share share1 = new Share(
                new ShareKey(
                        roma,
                        food
                ),
                new BigDecimal(200),
                ShareType.DEP
        );
        food.getShares().add(share1);

        Share share2 = new Share(
                new ShareKey(
                        yura,
                        food
                ),
                new BigDecimal(150),
                ShareType.DEBT
        );
        food.getShares().add(share2);

        Share share3 = new Share(
                new ShareKey(
                        geka,
                        food
                ),
                new BigDecimal(50),
                ShareType.DEBT
        );
        food.getShares().add(share3);

        Share share4 = new Share(
                new ShareKey(
                        yura,
                        wine
                ),
                new BigDecimal(500),
                ShareType.DEP
        );
        wine.getShares().add(share4);

        Share share5 = new Share(
                new ShareKey(
                    roma,
                    wine
                ),
                new BigDecimal(150),
                ShareType.DEBT
        );
        wine.getShares().add(share5);

        Share share6 = new Share(
                new ShareKey(
                        geka,
                        wine
                ),
                new BigDecimal(350),
                ShareType.DEBT
        );
        wine.getShares().add(share6);

//        shareRepository.save(share1);
//        shareRepository.save(share2);
//        shareRepository.save(share3);
//        shareRepository.save(share4);
//        shareRepository.save(share5);
//        shareRepository.save(share6);

        eventRepository.save(party);

        Event main = eventRepository.findOne(1L);
        System.out.println(main.toMap());

    }
}
