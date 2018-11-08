package romanusyk.ft.service.implementations;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import romanusyk.ft.domain.*;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import romanusyk.ft.exception.EntityIdNotValidException;
import romanusyk.ft.exception.EntityNotFoundException;
import romanusyk.ft.exception.UserAuthenticationException;
import romanusyk.ft.repository.GroupRepository;
import romanusyk.ft.repository.PaymentRepository;
import romanusyk.ft.repository.PaymentSpecs;
import romanusyk.ft.repository.UserRepository;
import romanusyk.ft.service.interfaces.Optimizer;
import romanusyk.ft.service.interfaces.PaymentService;
import romanusyk.ft.service.interfaces.UserService;
import romanusyk.ft.service.sandbox.SimpleDebtOptimizerV2;
import romanusyk.ft.utils.debts.DebtMapHolder;

import java.math.BigDecimal;
import java.util.*;

/**
 * Created by romm on 16.03.17.
 */
@Service
public class SpringPaymentService implements PaymentService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private Optimizer optimizer;

    private static final Logger logger = Logger.getLogger(SpringPaymentService.class);

    private List<Debt> getDebtList(Integer groupID, User client) {
        Set<Group> targetGroups = new HashSet<>();
        if (groupID != null) {
            Group selectedGroup = groupRepository.findOne(groupID);
            targetGroups.add(selectedGroup);
        } else {
            targetGroups.addAll(client.getGroups());
        }
        List<User> targetUsers = new LinkedList<>();
        for (Group group: targetGroups) {
            targetUsers.addAll(group.getUsers());
        }
        List<UserStatistics> statistics = new LinkedList<>();
        for (User u: targetUsers) {
            statistics.add(userService.getUserStatistics(u, targetGroups));
        }
        SimpleDebtOptimizerV2 optimizer = new SimpleDebtOptimizerV2();
        List<Debt> debts = optimizer.getOptimalPayments(statistics);
        if (!optimizer.whetherAllDebtsReturned()) {
            if (groupID != null) {
                throw new RuntimeException(String.format("Payments are incorrect for group %d!", groupID));
            }
            debts = new LinkedList<>();
            for (Group g: targetGroups) {
                debts.addAll(getDebtList(g.getId(), client));
            }
        }
        Group group = new Group();
        group.setId(groupID == null ? 0 : groupID);
        for (Debt d: debts) {
            d.setGroup(group);
        }
        return debts;
    }

    @Override
    public Map<Group, List<Debt> > getPaymentSum(Integer user, Integer groupID, User client) {
        client = userRepository.findOne(client.getId());
        List<Debt> debts = getDebtList(groupID, client);
        Map<Group, Map<DebtKey, List<Debt> > > debtKeyMap = new HashMap<>();
        for (Debt d: debts) {
            Group group = d.getGroup();
            debtKeyMap.computeIfAbsent(group, k -> new HashMap<>());
            DebtKey direct = new DebtKey(d.getUserFrom(), d.getUserTo(), group);
            Debt toAdd = d;
            if (!debtKeyMap.get(group).containsKey(direct)) {
                DebtKey indirect = new DebtKey(d.getUserTo(), d.getUserFrom(), group);
                if (debtKeyMap.get(group).containsKey(indirect)) {
                    toAdd = new Debt(d.getUserTo(), d.getUserFrom(), group, BigDecimal.ZERO.subtract(d.getAmount()));
                } else {
                    debtKeyMap.get(group).put(direct, new LinkedList<>());
                }
            }
            debtKeyMap.get(group).get(direct).add(toAdd);
        }
        Map<Group, List<Debt> > debtMap = new HashMap<>();
        for (Group g: debtKeyMap.keySet()) {
            Map<DebtKey, List<Debt> > groupDebtMap = debtKeyMap.get(g);
            debtMap.computeIfAbsent(g, k -> new LinkedList<>());
            for (DebtKey dk: groupDebtMap.keySet()) {
                if (user != null && !(dk.getUserFrom().getId().equals(user) || dk.getUserTo().getId().equals(user))) {
                    continue;
                }
                Debt debt = new Debt(dk.getUserFrom(), dk.getUserTo(), g, BigDecimal.ZERO);
                for (Debt d: groupDebtMap.get(dk)) {
                    debt.setAmount(debt.getAmount().add(d.getAmount()));
                }
                if (debt.getAmount().compareTo(BigDecimal.ZERO) < 0) {
                    debt = new Debt(debt.getUserTo(), debt.getUserFrom(), debt.getGroup(), debt.getAmount().abs());
                }
                logger.info(String.format("%d [%s -> %s]: %e",
                        g.getId(),
                        debt.getUserFrom().getUsername(),
                        debt.getUserTo().getUsername(),
                        debt.getAmount()
                ));
                if (debt.getAmount().compareTo(BigDecimal.ZERO) == 0) {
                    logger.info("Ok");
                    continue;
                }
                debtMap.get(g).add(debt);
            }
        }
        return debtMap;
    }

//    @Override
//    public Map<Group, List<Debt> > getPaymentSum(Integer user, Integer groupID, User client) {
//
//        List<Payment> payments = getPayments(null, null, groupID, client);
//
//        boolean dropGroup = groupID == null;
//        DebtMapHolder holder = new DebtMapHolder(payments, dropGroup);
//
//        Map<Group, List<Debt> > debtMap = holder
//                .dropGroup(dropGroup)
//                .sum()
//                .optimize(optimizer)
//                .applyUserFilter(user)
//                .reorderUsers()
//                .sum()
//                .getResult();
//
//        for (Group group: debtMap.keySet()) {
//            for (Debt debt : debtMap.get(group)) {
//                if (debt.getUserFrom().getId() != null && debt.getUserFrom().getId() > 0) {
//                    debt.setUserFrom(userRepository.findOne(debt.getUserFrom().getId()));
//                }
//                if (debt.getUserTo().getId() != null && debt.getUserTo().getId() > 0) {
//                    debt.setUserTo(userRepository.findOne(debt.getUserTo().getId()));
//                }
//            }
//        }
//
//        return debtMap;
//    }

    @Override
    public Specification<Payment> getFilter(Integer userFrom, Integer userTo, Integer groupId, User client) {
        client = userRepository.findOne(client.getId());
        return PaymentSpecs.filterPayment(userFrom, userTo, groupId, client.getGroups());
    }

    @Override
    public Page<Payment> getPaymentsPage(int page, int size,
                                         Integer userFromID, Integer userToID, Integer groupID, User client) {
        validateKeys(userFromID, userToID, groupID);
        Pageable pageable = new PageRequest(
                page,size
        );
        return paymentRepository.findAll(getFilter(userFromID, userToID, groupID, client), pageable);
    }

    @Override
    public List<Payment> getPayments(Integer userFromID, Integer userToID, Integer groupID, User client) {
        validateKeys(userFromID, userToID, groupID);
        return paymentRepository.findAll(getFilter(userFromID, userToID, groupID, client));
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
    public Payment updatePayment(Payment payment, User client) {
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
            throw new UserAuthenticationException("User can update only his/her own payments.");
        }
        if (payment.getUserFrom() != null
                || payment.getUserTo() != null
                || payment.getGroup() != null) {
            throw new EntityIdNotValidException("user_from, user_to and group_id cannot be changed." +
                    " Please, remove this payment and create a correct one.");
        }
        // Mapping fields
        // TODO: use mapper or smth like that
        if (payment.getAmount() != null) {
            existingPayment.setAmount(payment.getAmount());
        }
        if (payment.getDescription() != null) {
            existingPayment.setDescription(payment.getDescription());
        }

        paymentRepository.save(existingPayment);
        return existingPayment;
    }

    @Override
    public void deletePayment(Integer paymentID, User client) {
        Payment payment = paymentRepository.findOne(paymentID);
        if (payment == null) {
            throw new EntityIdNotValidException(Payment.class, paymentID);
        }
        if (!Objects.equals(payment.getUserFrom().getId(), client.getId())) {
            throw new UserAuthenticationException("User can delete only his/her own payments.");
        }
        paymentRepository.delete(payment);
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

}
