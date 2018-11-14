package romanusyk.ft.service.implementations;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import romanusyk.ft.data.model.dto.PaymentCreationDTO;
import romanusyk.ft.data.model.dto.UserStatistics;
import romanusyk.ft.data.model.value.Debt;
import romanusyk.ft.data.model.value.DebtKey;
import romanusyk.ft.data.entity.Group;
import romanusyk.ft.data.entity.Payment;
import romanusyk.ft.data.entity.User;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import romanusyk.ft.exception.EntityIdNotValidException;
import romanusyk.ft.exception.EntityNotFoundException;
import romanusyk.ft.exception.UserAuthenticationException;
import romanusyk.ft.repository.GroupRepository;
import romanusyk.ft.repository.PaymentRepository;
import romanusyk.ft.repository.PaymentSpecs;
import romanusyk.ft.repository.UserRepository;
import romanusyk.ft.service.interfaces.PaymentService;
import romanusyk.ft.service.interfaces.UserService;
import romanusyk.ft.utils.converter.PaymentConverter;

import java.math.BigDecimal;
import java.util.*;

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
            d.getKey().setGroup(group);
        }
        return debts;
    }

    @Override
    public Map<Group, List<Debt> > getPaymentSum(Integer user, Integer groupID, User client) {
        client = userRepository.findOne(client.getId());

        List<Debt> debts = getDebtList(groupID, client);
        Map<Group, Map<DebtKey, List<Debt> > > debtKeyMap = new HashMap<>();

        for (Debt debt: debts) {
            Group group = debt.getKey().getGroup();
            debtKeyMap.computeIfAbsent(group, k -> new HashMap<>());
            putDebtToGroupMap(debtKeyMap.get(group), debt);
        }

        Map<Group, List<Debt> > debtMap = new HashMap<>();
        for (Group g: debtKeyMap.keySet()) {
            Map<DebtKey, List<Debt> > groupDebtMap = debtKeyMap.get(g);
            debtMap.computeIfAbsent(g, k -> new LinkedList<>());
            for (DebtKey dk: groupDebtMap.keySet()) {
                if (user != null && !(dk.getUserFrom().getId().equals(user) || dk.getUserTo().getId().equals(user))) {
                    continue;
                }
                Debt debt = Debt.builder().key(dk.getUserFrom(), dk.getUserTo(), g).amount(BigDecimal.ZERO).build();
                for (Debt d: groupDebtMap.get(dk)) {
                    debt.setAmount(debt.getAmount().add(d.getAmount()));
                }
                if (debt.getAmount().compareTo(BigDecimal.ZERO) < 0) {
                    debt = Debt.builder().key(debt.getKey()).amount(debt.getAmount().abs()).build();
                }
                if (debt.getAmount().compareTo(BigDecimal.ZERO) == 0) {
                    continue;
                }
                debtMap.get(g).add(debt);
            }
        }

        return debtMap;
    }

    private static void putDebtToGroupMap(Map<DebtKey, List<Debt> > groupMap, Debt debt) {
        DebtKey direct = debt.getKey();
        DebtKey mapKey = direct;
        Debt mapValue = debt;
        if (!groupMap.containsKey(direct)) {
            DebtKey indirect = new DebtKey(
                    debt.getKey().getUserTo(),
                    debt.getKey().getUserFrom(),
                    debt.getKey().getGroup()
            );
            if (groupMap.containsKey(indirect)) {
                mapKey = indirect;
                mapValue = Debt.builder().key(debt.getKey()).amount(BigDecimal.ZERO.subtract(debt.getAmount())).build();
            } else {
                groupMap.put(direct, new LinkedList<>());
            }
        }
        groupMap.get(mapKey).add(mapValue);
    }

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
                throw new RuntimeException(String.format("Unable toCreation make payment. User with id %d does not exists.", userToID));
            }
            checkUserInGroup(userTo, group);

            Payment payment = PaymentConverter.fromCreation(paymentDTO, userFrom, userTo, group);
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
                    "Rejected. User %d tried toCreation pay fromCreation user %d.",
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
                    "Unable toCreation make payment. User %s is not in group %s.",
                    u.getId(),
                    g.getId()
            ));
        }
    }

}
