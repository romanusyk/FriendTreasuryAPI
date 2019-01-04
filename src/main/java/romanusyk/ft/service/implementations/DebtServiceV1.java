package romanusyk.ft.service.implementations;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import romanusyk.ft.data.entity.Group;
import romanusyk.ft.data.entity.User;
import romanusyk.ft.data.model.dto.DebtDTO;
import romanusyk.ft.data.model.dto.GroupDTO;
import romanusyk.ft.data.model.dto.UserStatistics;
import romanusyk.ft.data.model.value.Debt;
import romanusyk.ft.data.model.value.DebtKey;
import romanusyk.ft.repository.GroupRepository;
import romanusyk.ft.service.interfaces.DebtService;
import romanusyk.ft.service.interfaces.UserService;
import romanusyk.ft.utils.converter.DebtConverter;
import romanusyk.ft.utils.converter.GroupConverter;

import java.lang.invoke.MethodHandles;
import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Created by Roman Usyk on 27.11.18.
 */
@Service
@RequiredArgsConstructor
public class DebtServiceV1 implements DebtService {

    protected final UserService userService;
    protected final GroupRepository groupRepository;

    @Override
    public Map<Group, List<Debt> > getDebts(Integer user, Integer groupID, User client) {
        client = userService.getUserByID(client.getId());

        List<Debt> debts = getDebtList(groupID, client);
        Map<Group, Map<DebtKey, List<Debt> > > debtKeyMap = new HashMap<>();

        for (Debt debt: debts) {
            Group group = debt.getKey().getGroup();
            debtKeyMap.computeIfAbsent(group, k -> new HashMap<>());
            putDebtToGroupMap(debtKeyMap.get(group), debt);
        }

        Map<Group, List<Debt> > debtMap = new HashMap<>();
        for (Group g: debtKeyMap.keySet()) {
            Map<DebtKey, List<Debt> > groupDebtMap = debtKeyMap.get(g);
            debtMap.computeIfAbsent(g, k -> new LinkedList<>());
            for (DebtKey dk: groupDebtMap.keySet()) {
                if (user != null && !(dk.getUserFrom().getId().equals(user) || dk.getUserTo().getId().equals(user))) {
                    continue;
                }
                Debt debt = Debt.builder().key(dk.getUserFrom(), dk.getUserTo(), g).amount(BigDecimal.ZERO).build();
                for (Debt d: groupDebtMap.get(dk)) {
                    debt.setAmount(debt.getAmount().add(d.getAmount()));
                }
                if (debt.getAmount().compareTo(BigDecimal.ZERO) < 0) {
                    debt = Debt.builder().key(debt.getKey()).amount(debt.getAmount().abs()).build();
                }
                if (debt.getAmount().compareTo(BigDecimal.ZERO) == 0) {
                    continue;
                }
                debtMap.get(g).add(debt);
            }
        }

        return debtMap;
    }

    @Override
    public Map<GroupDTO, List<DebtDTO> > getDebtsDTO(Integer user, Integer groupID, User client) {
        return getDebts(user, groupID, client)
                .entrySet()
                .stream()
                .collect(
                        Collectors.toMap(
                                e -> GroupConverter.to(e.getKey()),
                                e -> e.getValue()
                                        .stream()
                                        .map(DebtConverter::to)
                                        .collect(Collectors.toList())
                        )
                );
    }

    public UserStatistics getUserStatistics(User u, Set<Group> targetGroups) {
        return userService.getUserStatistics(u, targetGroups);
    }

    private List<Debt> getDebtList(Integer groupID, User client) {
        Set<Group> targetGroups = new HashSet<>();
        if (groupID != null) {
            Group selectedGroup = groupRepository.findOne(groupID);
            targetGroups.add(selectedGroup);
        } else {
            targetGroups.addAll(client.getGroups());
        }
        List<User> targetUsers = new LinkedList<>();
        for (Group group: targetGroups) {
            targetUsers.addAll(group.getUsers());
        }
        List<UserStatistics> statistics = new LinkedList<>();
        for (User u: targetUsers) {
            statistics.add(getUserStatistics(u, targetGroups));
        }
        SimpleDebtOptimizerV2 optimizer = new SimpleDebtOptimizerV2();
        List<Debt> debts = optimizer.getOptimalPayments(statistics);
        if (!optimizer.whetherAllDebtsReturned()) {
            if (groupID != null) {
                throw new RuntimeException(String.format("Payments are incorrect for group %d!", groupID));
            }
            debts = new LinkedList<>();
            for (Group g: targetGroups) {
                debts.addAll(getDebtList(g.getId(), client));
            }
        }
        Group group = new Group();
        group.setId(groupID == null ? 0 : groupID);
        for (Debt d: debts) {
            d.getKey().setGroup(group);
        }
        return debts;
    }

    private static void putDebtToGroupMap(Map<DebtKey, List<Debt> > groupMap, Debt debt) {
        DebtKey direct = debt.getKey();
        DebtKey mapKey = direct;
        Debt mapValue = debt;
        if (!groupMap.containsKey(direct)) {
            DebtKey indirect = new DebtKey(
                    debt.getKey().getUserTo(),
                    debt.getKey().getUserFrom(),
                    debt.getKey().getGroup()
            );
            if (groupMap.containsKey(indirect)) {
                mapKey = indirect;
                mapValue = Debt.builder().key(debt.getKey()).amount(BigDecimal.ZERO.subtract(debt.getAmount())).build();
            } else {
                groupMap.put(direct, new LinkedList<>());
            }
        }
        groupMap.get(mapKey).add(mapValue);
    }

    private static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

}
