package repository;

import domain.Debt;
import domain.DebtKey;
import org.apache.log4j.Logger;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import service.PaymentService;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.math.BigDecimal;
import java.util.*;

/**
 * Created by romm on 27.02.17.
 */
@Service("optimizer")
public class DebtsOptimizer implements Optimizer {

    public EntityManager getEntityManager() {
        return entityManager;
    }

    public void setEntityManager(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @PersistenceContext
    protected EntityManager entityManager;

    @Autowired
    private PaymentService paymentService;

    @Override
    public Session getSession() throws HibernateException {
        return entityManager.unwrap(Session.class);
    }

//    private PaymentService

    static final Logger logger = Logger.getLogger(DebtsOptimizer.class);


    private enum COLOR {
        GRAY,
        BLACK;
    }

    private Map<Integer, Map<Integer, BigDecimal>> loadPayments() {

        Map<Integer, Map<Integer, BigDecimal>> result = new HashMap<>();

        int count = 0;
        List<Debt> resultList = paymentService.getDebts();
        for (Debt debt : resultList) {
            Integer u = debt.getUserFrom().getId();
            Integer v = debt.getUserTo().getId();
            BigDecimal value = debt.getAmount();
            Map<Integer, BigDecimal> uMap = result.get(u);
            if (uMap == null) {
                uMap = new HashMap<>();
                result.put(u, uMap);
            }
            BigDecimal uvValue = uMap.get(v);
            if (uvValue == null) {
                uvValue = new BigDecimal(0);
            }
            uvValue = uvValue.add(value);
            uMap.put(v, uvValue);
            count++;
        }
        logger.info("Fetched " + count + " rows.");
        return result;
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

    private void printGraph(Map<Integer, Map<Integer, BigDecimal>> graph) {
        for (Integer u : graph.keySet()) {
            for (Integer v : graph.get(u).keySet()) {
                System.out.println("(" + u + ", " + v + ") = " + graph.get(u).get(v));
            }
        }
    }

    private void saveDebts(Map<Integer, Map<Integer, BigDecimal>> graph) {
        NativeQuery q = getSession().createNativeQuery(
                        "INSERT INTO debts (user_from, user_to, amount) " +
                        "VALUES (:user_from, :user_to, :amount) " +
                        "ON DUPLICATE KEY UPDATE amount = VALUES(amount)"
        );
        for (Integer u : graph.keySet()) {
            for (Integer v : graph.get(u).keySet()) {
                q.setParameter("user_from", u);
                q.setParameter("user_to", v);
                q.setParameter("amount", graph.get(u).get(v));
                q.executeUpdate();
            }
        }
    }

    @Override
    @Transactional
    public void calculateDebts() {

        Map<Integer, Map<Integer, BigDecimal>> graph = loadPayments();
        printGraph(graph);

        Map<Integer, COLOR> colors = new HashMap<>();
        List<Integer> way = new LinkedList<>();
        boolean hasCycle = true;

        int count = 0;
        while (hasCycle && count < 1000) {
            hasCycle = false;
            colors.clear();
            for (Integer u : graph.keySet()) {
                if (colors.get(u) != null || colors.get(u) != COLOR.BLACK) {
                    way.clear();
                    colors.put(u, COLOR.GRAY);
                    way.add(u);
                    hasCycle = dfs(graph, colors, way, u);
                    colors.put(u, COLOR.BLACK);
                    if (hasCycle){
                        break;
                    }
                }
            }
            if (hasCycle) {
                logger.info("Cycle found!");
                Iterator<Integer> it = way.iterator();
                BigDecimal minValue = new BigDecimal(1e+9);
                Integer s = it.next();
                while (it.hasNext()) {
                    Integer t = it.next();
                    BigDecimal value = graph.get(s).get(t);
                    if (minValue.compareTo(value) == 1) {
                        minValue = value;
                    }
                    s = t;
                }
                it = way.iterator();
                s = it.next();
                while (it.hasNext()) {
                    Integer t = it.next();
                    BigDecimal value = graph.get(s).get(t);
                    value = value.subtract(minValue);
                    if (value.compareTo(BigDecimal.ZERO) == 0) {
                        System.out.println("Equals!");
                        graph.get(s).remove(t);
                    } else {
                        graph.get(s).put(t, value);
                    }
                    s = t;
                }
            } else {
                logger.info("No cycles found!");
            }
            printGraph(graph);
            count++;
        }

        saveDebts(graph);
    }

}
