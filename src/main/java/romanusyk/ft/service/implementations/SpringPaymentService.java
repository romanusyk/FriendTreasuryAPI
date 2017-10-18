package romanusyk.ft.service.implementations;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import romanusyk.ft.domain.*;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import romanusyk.ft.repository.GroupRepository;
import romanusyk.ft.repository.PaymentRepository;
import romanusyk.ft.repository.PaymentSpecs;
import romanusyk.ft.repository.UserRepository;
import romanusyk.ft.service.interfaces.PaymentService;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by romm on 16.03.17.
 */
@Service
public class SpringPaymentService implements PaymentService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    private static final Logger logger = Logger.getLogger(SpringPaymentService.class);

    @Override
    public Page<Payment> getPaymentsPage(int page, int size, Integer userFromID, Integer userToID, Integer groupID) {
        Pageable pageable = new PageRequest(
                page,size
        );
        return paymentRepository.findAll(PaymentSpecs.filterPayment(userFromID, userToID, groupID), pageable);
    }

    @Override
    public List<Payment> getPayments(Integer userFromID, Integer userToID, Integer groupID) {
        return paymentRepository.findAll(PaymentSpecs.filterPayment(userFromID, userToID, groupID));
    }

    @Override
    public void makeGroupPayment(PaymentDTO paymentDTO) {
        User userFrom = userRepository.findOne(paymentDTO.getUserFrom());
        Group group = groupRepository.findOne(paymentDTO.getGroup());

        checkUserInGroup(userFrom, group);

        BigDecimal amountPerUser = paymentDTO.getAmount().divide(
                new BigDecimal(paymentDTO.getUsersTo().length + paymentDTO.getShallIPayForMyself()),
                2,
                BigDecimal.ROUND_CEILING
        );
        for (Integer userToID : paymentDTO.getUsersTo()) {
            User userTo = userRepository.findOne(userToID);

            if (userTo == null) {
                throw new RuntimeException(String.format("Unable to make payment. User with id %d does not exists.", userToID));
            }
            checkUserInGroup(userTo, group);

            Payment payment = new Payment(
                    userFrom, userTo, group, amountPerUser,
                    paymentDTO.getDescription(),
                    paymentDTO.getDate(),
                    paymentDTO.getLongitude(), paymentDTO.getLatitude()
            );
            paymentRepository.save(payment);
        }

    }

    @Override
    public Map<Integer, BigDecimal> getUserPayments(Integer userID) {
        User u = userRepository.findOne(userID);
        if (u == null) {
            logger.error("User with id = " + userID + " not found!");
            return null;
        }

        Map<Integer, BigDecimal> userDebts = new HashMap<>();

        List<Payment> payments = paymentRepository.findPaymentsToUser(u);
        for (Payment payment : payments) {
            BigDecimal value = userDebts.get(payment.getUserFrom().getId());
            value = value == null ? new BigDecimal(0) : value;
            value = value.add(payment.getAmount());
            userDebts.put(payment.getUserFrom().getId(), value);
        }

        payments = paymentRepository.findPaymentsFromUser(u);
        for (Payment payment : payments) {
            BigDecimal value = userDebts.get(payment.getUserTo().getId());
            value = value == null ? new BigDecimal(0) : value;
            value = value.subtract(payment.getAmount());
            userDebts.put(payment.getUserTo().getId(), value);
        }
        return userDebts;
    }

    public List<Payment> getPaymentsBetweenUsers(Integer userFromID, Integer userToID) {
        User userFrom = userRepository.findOne(userFromID);
        if (userFrom == null) {
            logger.error("User with id = " + userFromID + " not found!");
            return null;
        }

        User userTo = userRepository.findOne(userToID);
        if (userTo == null) {
            logger.error("User with id = " + userToID + " not found!");
            return null;
        }

        List<Payment> payments = paymentRepository.findPaymentsFromUserToUser(userFrom, userTo);
        payments.addAll(paymentRepository.findPaymentsFromUserToUser(userTo, userFrom));

        return payments;
    }

    @Override
    public List<Debt> getDebts() {
        return paymentRepository.getDebts();
    }

    private static void checkUserInGroup(User u, Group g) {
        if (!g.getUsers().contains(u)) {
            throw new RuntimeException(String.format(
                    "Unable to make payment. User %s is not in group %s.",
                    u.getId(),
                    g.getId()
            ));
        }
    }

}
