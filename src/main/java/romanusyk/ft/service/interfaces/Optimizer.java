package romanusyk.ft.service.interfaces;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.springframework.context.annotation.Scope;
import romanusyk.ft.domain.Debt;
import romanusyk.ft.domain.Group;
import romanusyk.ft.domain.Payment;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

/**
 * Created by romm on 27.02.17.
 */
public interface Optimizer {

    void optimize(Map<Group, List<Debt> > debts);

    void optimize(Map<Group, List<Debt> > debts, int maxIterations);

}
