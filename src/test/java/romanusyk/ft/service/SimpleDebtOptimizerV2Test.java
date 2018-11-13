package romanusyk.ft.service;

import romanusyk.ft.data.model.value.Debt;
import romanusyk.ft.data.entity.Group;
import romanusyk.ft.data.entity.User;
import romanusyk.ft.data.model.dto.UserStatistics;
import romanusyk.ft.service.implementations.SimpleDebtOptimizerV2;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

/**
 * Created by Roman Usyk on 08.11.18.
 */
public class SimpleDebtOptimizerV2Test {

    public void testGetOptimalPaymentsOnSingleGroup() {
        List<User> users = new LinkedList<>();
        User roma = new User();
        roma.setId(1);
        roma.setUsername("Roma");
        users.add(roma);
        User yura = new User();
        yura.setId(2);
        yura.setUsername("Yura");
        users.add(yura);
        User geka = new User();
        geka.setId(3);
        geka.setUsername("Geka");
        users.add(geka);
        User serg = new User();
        serg.setId(4);
        serg.setUsername("Serg");
        users.add(serg);
        User andr = new User();
        andr.setId(5);
        andr.setUsername("Andr");
        users.add(andr);
        BigDecimal[] debts = new BigDecimal[]{
                new BigDecimal(300),
                new BigDecimal(500),
                new BigDecimal(-200),
                new BigDecimal(-200),
                new BigDecimal(-400)
        };
        Set<Group> groups = new HashSet<>();
        Group group = Group.builder().title("Test").name("Group").build();
        group.setId(1);
        groups.add(group);
        List<UserStatistics> userStatistics = new LinkedList<>();
        for (User u: users) {
            u.setGroups(groups);
            userStatistics.add(UserStatistics.builder()
                    .user(u)
                    .debt(debts[u.getId() - 1])
                    .build()
            );
        }
        for (UserStatistics us: userStatistics) {
            System.out.println(String.format("%s %f",
                    us.getUser().getUsername(),
                    us.getDebt()
            ));
        }
        SimpleDebtOptimizerV2 optimizer = new SimpleDebtOptimizerV2();
        List<Debt> result = optimizer.getOptimalPayments(userStatistics);
        for (Debt debt: result) {
            System.out.println(String.format("%s %s %f",
                    debt.getUserFrom().getUsername(),
                    debt.getUserTo().getUsername(),
                    debt.getAmount()
            ));
        }
    }

//    public void testGetOptimalPaymentsOnTwoGroups() {
//        List<User> users = new LinkedList<>();
//        User roma = new User();
//        roma.setId(1);
//        roma.setUsername("Roma");
//        users.add(roma);
//        User yura = new User();
//        yura.setId(2);
//        yura.setUsername("Yura");
//        users.add(yura);
//        User geka = new User();
//        geka.setId(3);
//        geka.setUsername("Geka");
//        users.add(geka);
//        BigDecimal[] debts = new BigDecimal[]{
//                new BigDecimal(0),
//                new BigDecimal(500),
//                new BigDecimal(-500)
//        };
//
//        Group group1 = Group.builder().title("Test").name("Group").build();
//        group1.setId(1);
//        Group group2 = Group.builder().title("Test").name("Group").build();
//        group2.setId(2);
//
//        Set<Group> groups1 = new HashSet<>();
//        Set<Group> groups2 = new HashSet<>();
//        Set<Group> groups3 = new HashSet<>();
//
//        groups1.add(group1);
//        groups1.add(group2);
//        groups2.add(group2);
//        groups3.add(group1);
//
//        List<UserStatistics> userStatistics = new LinkedList<>();
//        roma.setGroups(groups1);
//        userStatistics.add(new UserStatistics(
//                roma, debts[roma.getId() - 1]
//        ));
//        yura.setGroups(groups2);
//        userStatistics.add(new UserStatistics(
//                yura, debts[yura.getId() - 1]
//        ));
//        geka.setGroups(groups3);
//        userStatistics.add(new UserStatistics(
//                geka, debts[geka.getId() - 1]
//        ));
//        for (UserStatistics us: userStatistics) {
//            System.out.println(String.format("%s %f",
//                    us.getUser().getUsername(),
//                    us.getDebt()
//            ));
//        }
//        SimpleDebtOptimizerV2 optimizer = new SimpleDebtOptimizerV2();
//        List<Debt> result = optimizer.getOptimalPayments(userStatistics);
//        for (Debt debt: result) {
//            System.out.println(String.format("%s %s %f",
//                    debt.getUserFrom().getUsername(),
//                    debt.getUserTo().getUsername(),
//                    debt.getAmount()
//            ));
//        }
//    }

    public static void main(String[] args) {
        new SimpleDebtOptimizerV2Test().testGetOptimalPaymentsOnSingleGroup();
//        new SimpleDebtOptimizerV2Test().testGetOptimalPaymentsOnTwoGroups();
    }
}
