package service;

import domain.Debt;
import domain.Payment;
import domain.PaymentDTO;
import domain.User;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repository.PaymentRepository;
import repository.UserRepository;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by romm on 16.03.17.
 */
@Service("springPaymentService")
public class SpringPaymentService implements PaymentService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PaymentRepository paymentRepository;

    private static final Logger logger = Logger.getLogger(SpringPaymentService.class);

    @Override
    public void init() {
//        makeGroupPayment(new PaymentDTO(1, new Integer[]{2, 3, 4}, new BigDecimal(200), "Test", new Date(), 30.52, 50.44));
//        makeGroupPayment(new PaymentDTO(2, new Integer[]{3, 4}, new BigDecimal(300), "Test", new Date(), 30.52, 50.44));
    }

    @Override
    public boolean makePayment(User from, User to, BigDecimal amount, String description, Date date, double longitude, double latitude) {
        Payment payment = new Payment(from, to, amount, description, date, longitude, latitude);
        payment = paymentRepository.save(payment);
        return payment.getId() != null;
    }

    @Override
    public boolean makeGroupPayment(PaymentDTO paymentDTO) {
        User userFrom = userRepository.findOne(paymentDTO.getUserFrom());
        BigDecimal amountPerUser = paymentDTO.getAmount().divide(new BigDecimal(paymentDTO.getUsersTo().length + paymentDTO.getShallIPayForMyself()), 2, BigDecimal.ROUND_CEILING);
        boolean success = true;
        for (Integer userToID : paymentDTO.getUsersTo()) {
            User userTo = userRepository.findOne(userToID);
            success &= makePayment(userFrom, userTo, amountPerUser, paymentDTO.getDescription(), paymentDTO.getDate(), paymentDTO.getLongitude(), paymentDTO.getLatitude());
        }
        return success;
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

}
