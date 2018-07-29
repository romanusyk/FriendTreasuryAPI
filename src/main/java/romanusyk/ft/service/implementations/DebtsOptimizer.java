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

    @Override
    public void optimize(Map<Group, List<Debt> > debts) {
        optimize(debts, 1000);
    }

    @Override
    public void optimize(Map<Group, List<Debt> > debts, int maxIterations) {
        for (Group group : debts.keySet()) {
            List<Debt> debtList = debts.get(group);
            Map<Integer, Map<Integer, BigDecimal> > debtMap = debts2map(debtList);
            optimizeDebts(debtMap, maxIterations);
            debtList = map2debts(group, debtMap);
            debts.put(group, debtList);
        }
    }

    protected Map<Integer, Map<Integer, BigDecimal> > debts2map(List<Debt> debts) {
        Map<Integer, Map<Integer, BigDecimal> > map = new HashMap<>();

        for (Debt debt : debts) {
            Integer userFrom = debt.getUserFrom().getId();
            Integer userTo = debt.getUserTo().getId();
            BigDecimal value = debt.getAmount();
            Map<Integer, BigDecimal> userFromMap = map.computeIfAbsent(userFrom, k -> new HashMap<>());
            userFromMap.merge(userTo, value, BigDecimal::add);
        }

        return map;
    }

    protected List<Debt> map2debts(Group group, Map<Integer, Map<Integer, BigDecimal> > map) {
        List<Debt> debts = new LinkedList<>();

        for (Integer userFromID : map.keySet()) {
            Map<Integer, BigDecimal> userFromMap = map.get(userFromID);
            User userFrom = userFromID == null ? null : userRepository.findOne(userFromID);
            for (Integer userToID : userFromMap.keySet()) {
                User userTo = userToID == null ? null : userRepository.findOne(userToID);
                BigDecimal value = userFromMap.get(userToID);
                debts.add(new Debt(userFrom, userTo, group, value));
            }
        }

        return debts;
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

    protected void optimizeDebts(Map<Integer, Map<Integer, BigDecimal>> debtMap, int maxIterations) {

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

                // Remain only "circle"
                while (!Objects.equals(way.get(0), way.get(way.size() - 1))) {
                    way.remove(0);
                }

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

    private static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

    public UserRepository getUserRepository() {
        return userRepository;
    }

    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

}
