package romanusyk.ft.service.interfaces;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import romanusyk.ft.domain.*;

import java.util.List;
import java.util.Map;

/**
 * Created by romm on 03.02.17.
 */
public interface PaymentService {

    void makeGroupPayment(PaymentDTO paymentDTO);

    Specification<Payment> getFilter(Integer userFrom, Integer userTo, Integer groupId, User client);

    Map<Group, List<Debt> > getPaymentSum(Integer user, Integer groupID, User client);

    Page<Payment> getPaymentsPage(int page, int size,
                                  Integer userFromID, Integer userToID, Integer groupID, User client);

    List<Payment> getPayments(Integer userFromID, Integer userToID, Integer groupID, User client);

}
