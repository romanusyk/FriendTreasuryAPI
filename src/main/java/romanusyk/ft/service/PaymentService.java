package romanusyk.ft.service;

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

    @PostConstruct
    @Transactional
    void init();

    boolean makePayment(User from, User to, BigDecimal amount, String description, Date date, double longitude, double latitude);

    boolean makeGroupPayment(PaymentDTO paymentDTO);

    Map<Integer, BigDecimal> getUserPayments(Integer userID);

    List<Payment> getPaymentsBetweenUsers(Integer userFromID, Integer userToID);

    List<Debt> getDebts();

}
