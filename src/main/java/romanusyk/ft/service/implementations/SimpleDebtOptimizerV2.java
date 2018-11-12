package romanusyk.ft.service.implementations;

import romanusyk.ft.data.model.value.Debt;
import romanusyk.ft.data.entity.Group;
import romanusyk.ft.data.model.dto.UserStatistics;
import romanusyk.ft.service.interfaces.DebtOptimizerV2;

import java.math.BigDecimal;
import java.util.*;

/**
 * Created by Roman Usyk on 08.11.18.
 */
public class SimpleDebtOptimizerV2 implements DebtOptimizerV2 {

    private List<UserStatistics> positiveUsers;
    private List<UserStatistics> negativeUsers;
    private Map<Integer, Map<Integer, Boolean> > areFamiliar;
    private BigDecimal totalDebt;
    private Map<Integer, BigDecimal> debtSums;

    public SimpleDebtOptimizerV2() {
        this.positiveUsers = new ArrayList<>();
        this.negativeUsers = new ArrayList<>();
        this.areFamiliar = new HashMap<>();
        this.debtSums = new HashMap<>();
    }

    @Override
    public List<Debt> getOptimalPayments(List<UserStatistics> users) {
        splitUsersIntoPositiveAndNegative(users);
        calculateTotalDebt();
        buildFamiliarityMatrix();
        List<Debt> result = new LinkedList<>();
        sortUsers();
        for (UserStatistics positive : positiveUsers) {
            for (UserStatistics negative : negativeUsers) {
//                System.out.println(String.format("%s %f -> %s %f",
//                        positive.getUsername(), positive.getDebt(),
//                        negative.getUsername(), negative.getDebt()
//                ));
                if (!areFamiliar.get(positive.getUserId()).get(negative.getUserId())) {
                    continue;
                }
                if (positive.getDebt().equals(BigDecimal.ZERO) || negative.getDebt().equals(BigDecimal.ZERO)) {
                    continue;
                }
                int cmp = positive.getDebt().compareTo(negative.getDebt().abs());
                BigDecimal debtAmount = cmp < 0 ? positive.getDebt() : negative.getDebt().abs();

                result.add(new Debt(
                        positive.getUser(),
                        negative.getUser(),
                        null,
                        debtAmount
                ));

                positive.setDebt(positive.getDebt().subtract(debtAmount));
                debtSums.computeIfAbsent(positive.getUserId(), k -> BigDecimal.ZERO);
                debtSums.merge(positive.getUserId(), debtAmount, BigDecimal::add);

                negative.setDebt(negative.getDebt().add(debtAmount));
                debtSums.computeIfAbsent(negative.getUserId(), k -> BigDecimal.ZERO);
                debtSums.merge(negative.getUserId(), debtAmount, BigDecimal::subtract);
            }
        }
        return result;
    }

    public boolean whetherAllDebtsReturned() {
        BigDecimal debtSum = new BigDecimal(0);
        for (UserStatistics statistics: positiveUsers) {
            debtSum = debtSum.add(debtSums.get(statistics.getUserId()));
        }
        return debtSum.equals(totalDebt);
    }

    public Map<Integer, BigDecimal> getReturnedDebtsSums() {
        return debtSums;
    }

    private void calculateTotalDebt() {
        BigDecimal positiveSum = new BigDecimal(0);
        for (UserStatistics statistics: positiveUsers) {
            positiveSum = positiveSum.add(statistics.getDebt());
        }
        BigDecimal negativeSum = new BigDecimal(0);
        for (UserStatistics statistics: negativeUsers) {
            negativeSum = negativeSum.subtract(statistics.getDebt());
        }
        assert positiveSum.equals(negativeSum);
        this.totalDebt = positiveSum;
    }

    private void sortUsers() {
        positiveUsers.sort((u1, u2) -> Float.compare(u2.getDebt().floatValue(), u1.getDebt().floatValue()));
        negativeUsers.sort((u1, u2) -> Float.compare(u1.getDebt().floatValue(), u2.getDebt().floatValue()));
    }

    private void buildFamiliarityMatrix() {
        for (UserStatistics positive: positiveUsers) {
            for (UserStatistics negative: negativeUsers) {
                boolean areUsersFamiliar = areUsersFamiliar(positive, negative);
                areFamiliar.computeIfAbsent(positive.getUserId(), k -> new HashMap<>());
                areFamiliar.get(positive.getUserId()).put(negative.getUserId(), areUsersFamiliar);
                areFamiliar.computeIfAbsent(negative.getUserId(), k -> new HashMap<>());
                areFamiliar.get(negative.getUserId()).put(positive.getUserId(), areUsersFamiliar);
            }
        }
    }

    private boolean areUsersFamiliar(UserStatistics positive, UserStatistics negative) {
        Set<Group> intersection = new HashSet<>(positive.getGroups());
        intersection.retainAll(negative.getGroups());
        return !intersection.isEmpty();
    }

    private void splitUsersIntoPositiveAndNegative(List<UserStatistics> users) {
        assert positiveUsers.size() == 0;
        assert negativeUsers.size() == 0;

        for (UserStatistics u: users) {
            if (u.getDebt().floatValue() > 0) {
                positiveUsers.add(u);
            } else {
                negativeUsers.add(u);
            }
        }
    }
}
