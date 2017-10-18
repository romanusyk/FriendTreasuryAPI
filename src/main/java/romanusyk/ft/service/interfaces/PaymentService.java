package romanusyk.ft.service.interfaces;

import org.springframework.data.domain.Page;
import romanusyk.ft.domain.Debt;
import romanusyk.ft.domain.Payment;
import romanusyk.ft.domain.PaymentDTO;
import romanusyk.ft.domain.User;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by romm on 03.02.17.
 */
public interface PaymentService {

    void makeGroupPayment(PaymentDTO paymentDTO);

    Map<Integer, BigDecimal> getUserPayments(Integer userID);

    List<Payment> getPaymentsBetweenUsers(Integer userFromID, Integer userToID);

    List<Debt> getDebts();

    Page<Payment> getPaymentsPage(int page, int size, Integer userFromID, Integer userToID, Integer groupID);

    List<Payment> getPayments(Integer userFromID, Integer userToID, Integer groupID);

}
