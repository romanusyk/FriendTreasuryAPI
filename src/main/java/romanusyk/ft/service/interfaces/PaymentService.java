package romanusyk.ft.service.interfaces;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import romanusyk.ft.data.model.dto.PaymentCreationDTO;
import romanusyk.ft.data.model.value.Debt;
import romanusyk.ft.data.entity.Group;
import romanusyk.ft.data.entity.Payment;
import romanusyk.ft.data.entity.User;

import java.util.List;
import java.util.Map;

/**
 * Created by romm on 03.02.17.
 */
public interface PaymentService {

    void makeGroupPayment(PaymentCreationDTO paymentDTO);

    Payment updatePayment(Payment payment, User client);

    void deletePayment(Integer paymentID, User client);

    Specification<Payment> getFilter(Integer userFrom, Integer userTo, Integer groupId, User client);

    Map<Group, List<Debt> > getPaymentSum(Integer user, Integer groupID, User client);

    Page<Payment> getPaymentsPage(int page, int size,
                                  Integer userFromID, Integer userToID, Integer groupID, User client);

    List<Payment> getPayments(Integer userFromID, Integer userToID, Integer groupID, User client);
}
