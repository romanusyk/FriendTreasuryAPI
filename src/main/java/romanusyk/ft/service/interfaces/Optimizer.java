package romanusyk.ft.service.interfaces;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.springframework.context.annotation.Scope;
import romanusyk.ft.domain.Debt;
import romanusyk.ft.domain.Payment;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

/**
 * Created by romm on 27.02.17.
 */
@Scope("prototype")
public interface Optimizer {

    void sumPayments(List<Payment> paymentList, Integer groupID);

    void optimizeDebts();

    Map<Integer, Map<Integer, BigDecimal>> getDebtMap();

    public List<Debt> getDebts();

}
