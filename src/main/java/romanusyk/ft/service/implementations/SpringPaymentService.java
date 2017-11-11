package romanusyk.ft.service.implementations;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import romanusyk.ft.domain.*;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import romanusyk.ft.exception.EntityIdNotValidException;
import romanusyk.ft.repository.GroupRepository;
import romanusyk.ft.repository.PaymentRepository;
import romanusyk.ft.repository.PaymentSpecs;
import romanusyk.ft.repository.UserRepository;
import romanusyk.ft.service.interfaces.Optimizer;
import romanusyk.ft.service.interfaces.PaymentService;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

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

    @Autowired
    private Optimizer optimizer;

    private static final Logger logger = Logger.getLogger(SpringPaymentService.class);

    @Override
    public Map<Group, List<Debt> > getPaymentSum(Integer userFromID, Integer userToID, Integer groupID) {

        List<Payment> payments = getPayments(null, null, groupID);

        User userFrom = new User();
        userFrom.setId(userFromID);
        User userTo = new User();
        userTo.setId(userToID);
        Group group = new Group();
        group.setId(groupID);

        DebtKey drop = new DebtKey(userFrom, userTo, group);

        Map<Group, List<Debt> > debtMap = sumPayments(payments, drop);
        optimizer.optimize(debtMap);

        return debtMap;
    }

    private Map<Group, List<Debt> > sumPayments(List<Payment> payments, DebtKey drop) {

        Map<Group, Map<DebtKey, BigDecimal> > debtMap = new HashMap<>();

        for (Payment p : payments) {
            User userFrom = drop.getUserFrom().getId() == null ? drop.getUserFrom() : p.getUserFrom();
            User userTo = drop.getUserTo().getId() == null ? drop.getUserTo() : p.getUserTo();
            Group group = drop.getGroup().getId() == null ? drop.getGroup() : p.getGroup();

            if (!userFrom.equals(drop.getUserFrom())) {userFrom.setId(null);}
            if (!userTo.equals(drop.getUserTo())) {userTo.setId(null);}

            BigDecimal value = p.getAmount();

            logger.debug(p.toDetailedString());

            Map<DebtKey, BigDecimal> groupMap = debtMap.computeIfAbsent(group, k -> new HashMap<>());

            DebtKey key = new DebtKey(userFrom, userTo, group);
            groupMap.merge(key, value, BigDecimal::add);
        }

        return debtMap.entrySet().stream().collect(Collectors.toMap(
                Map.Entry::getKey,
                e -> e.getValue().entrySet().stream().map((item) -> new Debt(
                        item.getKey().getUserFrom(), item.getKey().getUserTo(), item.getKey().getGroup(), item.getValue()
                )).collect(Collectors.toList())
        ));

    }

    @Override
    public Page<Payment> getPaymentsPage(int page, int size, Integer userFromID, Integer userToID, Integer groupID) {
        validateKeys(userFromID, userToID, groupID);
        Pageable pageable = new PageRequest(
                page,size
        );
        return paymentRepository.findAll(PaymentSpecs.filterPayment(userFromID, userToID, groupID), pageable);
    }

    @Override
    public List<Payment> getPayments(Integer userFromID, Integer userToID, Integer groupID) {
        validateKeys(userFromID, userToID, groupID);
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
