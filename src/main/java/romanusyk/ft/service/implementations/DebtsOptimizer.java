package romanusyk.ft.service.implementations;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import romanusyk.ft.domain.Debt;
import romanusyk.ft.domain.Group;
import romanusyk.ft.domain.Payment;
import romanusyk.ft.domain.User;
import romanusyk.ft.repository.GroupRepository;
import romanusyk.ft.repository.UserRepository;
import romanusyk.ft.service.interfaces.Optimizer;

import java.lang.invoke.MethodHandles;
import java.math.BigDecimal;
import java.util.*;

/**
 * Created by romm on 27.02.17.
 */
@Service
public class DebtsOptimizer implements Optimizer {

    private enum COLOR {
        GRAY,
        BLACK;
    }

    @Autowired private UserRepository userRepository;

    @Autowired private GroupRepository groupRepository;

    private Integer groupID;

    private Map<Integer, Map<Integer, BigDecimal>> debtMap;

    private int maxIterations;

    public DebtsOptimizer() {
        maxIterations = 1000;
    }

    public DebtsOptimizer(int maxIterations) {
        this.maxIterations = maxIterations;
    }

    @Override
    public void sumPayments(List<Payment> paymentList, Integer groupID) {

        this.groupID = groupID;
        debtMap = new HashMap<>();

        for (Payment p : paymentList) {
            Integer u = p.getUserFrom().getId();
            Integer v = p.getUserTo().getId();
            BigDecimal value = p.getAmount();
            Map<Integer, BigDecimal> uMap = debtMap.computeIfAbsent(u, k -> new HashMap<>());
            BigDecimal uvValue = uMap.computeIfAbsent(v, k -> new BigDecimal(0)).add(value);
            uMap.put(v, uvValue);
        }

    }

    private boolean dfs(
            Map<Integer, Map<Integer, BigDecimal>> graph,
            Map<Integer, COLOR> colors,
            List<Integer> way,
            Integer u) {

        boolean result = false;
        Map<Integer, BigDecimal> uMap = graph.get(u);
        if (uMap != null) {
            for (Integer v : uMap.keySet()) {
                COLOR color = colors.get(v);
                if (color == null) {
                    colors.put(v, COLOR.GRAY);
                    way.add(v);
                    result = dfs(graph, colors, way, v);
                    if (result) {
                        break;
                    } else {
                        way.remove(way.size() - 1);
                    }
                } else if (color == COLOR.GRAY) {
                    way.add(v);
                    result = true;
                    break;
                }
            }
        }
        colors.put(u, COLOR.BLACK);
        return result;
    }

    @Override
    public void optimizeDebts() {

        Map<Integer, COLOR> colors = new HashMap<>();
        List<Integer> way = new LinkedList<>();
        boolean hasCycle = true;

        int count = 0;
        while (hasCycle && count < maxIterations) {
            hasCycle = false;
            colors.clear();
            for (Integer u : debtMap.keySet()) {
                if (colors.get(u) == null) {
                    way.clear();
                    colors.put(u, COLOR.GRAY);
                    way.add(u);
                    hasCycle = dfs(debtMap, colors, way, u);
                    colors.put(u, COLOR.BLACK);
                    if (hasCycle){
                        break;
                    }
                }
            }
            if (hasCycle) {
                Iterator<Integer> it = way.iterator();
                BigDecimal minValue = new BigDecimal(1e+9);
                Integer s = it.next();
                while (it.hasNext()) {
                    Integer t = it.next();
                    BigDecimal value = debtMap.get(s).get(t);
                    if (minValue.compareTo(value) == 1) {
                        minValue = value;
                    }
                    s = t;
                }
                it = way.iterator();
                s = it.next();
                while (it.hasNext()) {
                    Integer t = it.next();
                    BigDecimal value = debtMap.get(s).get(t);
                    value = value.subtract(minValue);
                    if (value.compareTo(BigDecimal.ZERO) == 0) {
                        debtMap.get(s).remove(t);
                        if (debtMap.get(s).isEmpty()) {
                            debtMap.remove(s);
                        }
                    } else {
                        debtMap.get(s).put(t, value);
                    }
                    s = t;
                }
            }
            count++;
        }
        logger.info("Optimization finished. Founded " + (count - 1) + " circles.");

    }

    public Map<Integer, Map<Integer, BigDecimal>> getDebtMap() {
        return debtMap;
    }

    @Override
    public List<Debt> getDebts() {
        List<Debt> debts = new LinkedList<>();

        Group group = groupID != null ? groupRepository.findOne(groupID) : null;

        for(Integer userFromID: debtMap.keySet()) {
            User userFrom = userRepository.findOne(userFromID);

            for(Integer userToID: debtMap.get(userFromID).keySet()) {
                User userTo = userRepository.findOne(userToID);
                debts.add(new Debt(userFrom, userTo, group, debtMap.get(userFromID).get(userToID)));
            }
        }

        return debts;
    }

    private static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

    public UserRepository getUserRepository() {
        return userRepository;
    }

    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public GroupRepository getGroupRepository() {
        return groupRepository;
    }

    public void setGroupRepository(GroupRepository groupRepository) {
        this.groupRepository = groupRepository;
    }

}
