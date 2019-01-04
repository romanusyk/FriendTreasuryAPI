package romanusyk.ft.service.implementations;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import romanusyk.ft.data.model.dto.*;
import romanusyk.ft.data.model.value.Debt;
import romanusyk.ft.data.model.value.DebtKey;
import romanusyk.ft.data.entity.Group;
import romanusyk.ft.data.entity.Payment;
import romanusyk.ft.data.entity.User;
import org.springframework.stereotype.Service;
import romanusyk.ft.exception.EntityIdNotValidException;
import romanusyk.ft.exception.EntityNotFoundException;
import romanusyk.ft.exception.UserPermissionsException;
import romanusyk.ft.repository.GroupRepository;
import romanusyk.ft.repository.PaymentRepository;
import romanusyk.ft.utils.db.PaymentSpecs;
import romanusyk.ft.repository.UserRepository;
import romanusyk.ft.service.interfaces.PaymentService;
import romanusyk.ft.service.interfaces.UserService;
import romanusyk.ft.utils.converter.DebtConverter;
import romanusyk.ft.utils.converter.GroupConverter;
import romanusyk.ft.utils.converter.PaymentConverter;

import java.lang.invoke.MethodHandles;
import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Created by romm on 16.03.17.
 */
@Service
@RequiredArgsConstructor
public class SpringPaymentService implements PaymentService {

    private final UserRepository userRepository;
    private final UserService userService;
    private final GroupRepository groupRepository;
    private final PaymentRepository paymentRepository;

    @Override
    public List<PaymentDTO> getPayments(Integer userFromID, Integer userToID, Integer groupID, User client) {
        validateKeys(userFromID, userToID, groupID);
        return paymentRepository
                .findAll(getFilter(userFromID, userToID, groupID, client))
                .stream()
                .map(PaymentConverter::to)
                .collect(Collectors.toList());
    }

    @Override
    public Page<PaymentDTO> getPaymentsPage(int page, int size,
                                            Integer userFromID, Integer userToID, Integer groupID, User client) {
        validateKeys(userFromID, userToID, groupID);
        Pageable pageable = new PageRequest(
                page,size
        );
        return paymentRepository
                .findAll(getFilter(userFromID, userToID, groupID, client), pageable)
                .map(PaymentConverter::to);
    }

    @Override
    public void makeGroupPayment(PaymentCreationDTO paymentDTO) {
        User userFrom = userRepository.findOne(paymentDTO.getUserFrom());
        Group group = groupRepository.findOne(paymentDTO.getGroup());

        checkUserInGroup(userFrom, group);

        BigDecimal amountPerUser = paymentDTO.getAmount().divide(
                new BigDecimal(paymentDTO.getUsersTo().length + paymentDTO.getShallIPayForMyself()),
                2,
                BigDecimal.ROUND_CEILING
        );
        paymentDTO.setAmount(amountPerUser);

        for (Integer userToID : paymentDTO.getUsersTo()) {
            User userTo = userRepository.findOne(userToID);

            if (userTo == null) {
                throw new RuntimeException(String.format("Unable to make payment. User with id %d does not exists.", userToID));
            }
            checkUserInGroup(userTo, group);

            Payment payment = PaymentConverter.fromCreation(paymentDTO, userFrom, userTo, group);
            paymentRepository.save(payment);
        }

    }

    @Override
    public PaymentDTO updatePayment(PaymentDTO payment, User client) {
        if (payment.getId() == null) {
            throw new EntityIdNotValidException(Payment.class, payment.getId());
        }
        Payment existingPayment = paymentRepository.findOne(payment.getId());
        if (existingPayment == null) {
            throw new EntityNotFoundException(Payment.class, payment);
        }
        if (!Objects.equals(existingPayment.getUserFrom().getId(), client.getId())) {
            logger.debug(String.format(
                    "Rejected. User %d tried to pay from user %d.",
                    client.getId(),
                    existingPayment.getUserFrom().getId()
            ));
            throw new UserPermissionsException("User can update only his/her own payments.");
        }
        if (payment.getUserFrom() != null
                || payment.getUserTo() != null
                || payment.getGroup() != null) {
            throw new EntityIdNotValidException("user_from, user_to and group_id cannot be changed." +
                    " Please, remove this payment and create a correct one.");
        }

        existingPayment.updateIfPresent(payment.getAmount(), payment.getDescription());

        paymentRepository.save(existingPayment);
        return PaymentConverter.to(existingPayment);
    }

    @Override
    public void deletePayment(Integer paymentID, User client) {
        Payment payment = paymentRepository.findOne(paymentID);
        if (payment == null) {
            throw new EntityIdNotValidException(Payment.class, paymentID);
        }
        if (!Objects.equals(payment.getUserFrom().getId(), client.getId())) {
            throw new UserPermissionsException("User can delete only his/her own payments.");
        }
        paymentRepository.delete(payment);
    }

    @Override
    public Specification<Payment> getFilter(Integer userFrom, Integer userTo, Integer groupId, User client) {
        client = userRepository.findOne(client.getId());
        return PaymentSpecs.filterPayment(userFrom, userTo, groupId, client.getGroups());
    }

    /**
     * Check if both of three: userFrom, userTo, groupId are not provided or existing
     */
    private void validateKeys(Integer userFromID, Integer userToID, Integer groupID) {
        User userFrom = userFromID == null || userFromID == 0 ? null : userRepository.findOne(userFromID);
        User userTo = userToID == null || userToID == 0 ? null : userRepository.findOne(userToID);
        Group group = groupID == null || groupID == 0 ? null : groupRepository.findOne(groupID);

        List<String> errors = new LinkedList<>();

        if (userFromID != null && userFromID != 0 && userFrom == null) {
            errors.add("userFromID is wrong: " + userFromID);
        }
        if (userToID != null && userToID != 0 && userTo == null) {
            errors.add("userToID is wrong: " + userToID);
        }
        if (groupID != null && groupID != 0 && group == null) {
            errors.add("groupID is wrong: " + groupID);
        }

        if (!errors.isEmpty()) {
            throw new EntityIdNotValidException(errors.toString());
        }
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

    private static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

}
