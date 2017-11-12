package romanusyk.ft.service.implementations;

import romanusyk.ft.domain.*;
import romanusyk.ft.service.interfaces.Optimizer;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Created by Roman Usyk on 12.11.17.
 */
public class DebtMapHolder {

    private Map<Group, List<Debt> > debtMap;

    public DebtMapHolder(List<Payment> payments, boolean dropGroup) {

        this.debtMap = new HashMap<>();

        for (Payment p : payments) {

            Debt debt = new Debt(
                    p.getUserFrom(),
                    p.getUserTo(),
                    p.getGroup(),
                    p.getAmount()
            );

            if (dropGroup) {
                debt.setGroup(new Group().setId(0));
            }

            List<Debt> groupList = debtMap.computeIfAbsent(debt.getGroup(), k -> new LinkedList<>());

            groupList.add(debt);
        }

    }

    public DebtMapHolder(List<Payment> payments) {
        this(payments, false);
    }

    public DebtMapHolder sum(boolean dropGroup) {

        Map<Group, Map<DebtKey, BigDecimal> > debtKeyMap = new HashMap<>();

        for (Group group : debtMap.keySet()) {

            List<Debt> debtList = debtMap.get(group);

            Group groupForKey = new Group().setId(group.getId());
            if (dropGroup) {
                groupForKey = new Group().setId(0);
            }

            Map<DebtKey, BigDecimal> debtKeyGroupMap = debtKeyMap.computeIfAbsent(
                    groupForKey, k -> new HashMap<>());

            for (Debt debt : debtList) {

                DebtKey key = new DebtKey(
                        debt.getUserFrom(),
                        debt.getUserTo(),
                        group
                );

                BigDecimal value = debt.getAmount();

                debtKeyGroupMap.merge(key, value, BigDecimal::add);
            }
        }

        debtMap = debtKeyMap.entrySet().stream().collect(Collectors.toMap(
                Map.Entry::getKey,
                e -> e.getValue().entrySet().stream().map((item) -> new Debt(
                        item.getKey().getUserFrom(), item.getKey().getUserTo(), item.getKey().getGroup(), item.getValue()
                )).collect(Collectors.toList())
        ));
        return this;
    }

    public DebtMapHolder applyUserFilter(Integer userId) {

        Map<Group, Map<DebtKey, BigDecimal> > debtKeyMap = new HashMap<>();

        for (Group group : debtMap.keySet()) {

            List<Debt> debtList = debtMap.get(group);

            Map<DebtKey, BigDecimal> debtKeyGroupMap = new HashMap<>();

            for (Debt debt : debtList) {

                DebtKey key = new DebtKey(
                        new User().setId(debt.getUserFrom().getId()),
                        new User().setId(debt.getUserTo().getId()),
                        group
                );

                if (userId != null && !key.getUserFrom().getId().equals(userId)) {
                    key.getUserFrom().setId(0);
                }
                if (userId != null && !key.getUserTo().getId().equals(userId)) {
                    key.getUserTo().setId(0);
                }

                if (key.getUserFrom().getId().equals(0) && key.getUserTo().getId().equals(0)) {
                    continue;
                }

                BigDecimal value = debt.getAmount();

                debtKeyGroupMap.merge(key, value, BigDecimal::add);
            }

            debtKeyMap.put(group, debtKeyGroupMap);

        }

        debtMap = debtKeyMap.entrySet().stream().collect(Collectors.toMap(
                Map.Entry::getKey,
                e -> e.getValue().entrySet().stream().map((item) -> new Debt(
                        item.getKey().getUserFrom(), item.getKey().getUserTo(), item.getKey().getGroup(), item.getValue()
                )).collect(Collectors.toList())
        ));
        return this;
    }

    public DebtMapHolder reorderUsers() {

        for (Group group : debtMap.keySet()) {

            for (Debt debt : debtMap.get(group)) {
                if (debt.getUserFrom().getId() == 0) {
                    User t = debt.getUserFrom();
                    debt.setUserFrom(debt.getUserTo());
                    debt.setUserTo(t);
                    debt.setAmount(debt.getAmount().negate());
                }
            }

        }

        return this;
    }

    public DebtMapHolder optimize(Optimizer optimizer) {
        optimizer.optimize(debtMap);
        return this;
    }

    public Map<Group, List<Debt> > getResult() {
        return this.debtMap;
    }

}
