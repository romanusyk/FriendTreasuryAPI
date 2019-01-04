package romanusyk.ft.service.implementations;

import org.springframework.stereotype.Service;
import romanusyk.ft.data.entity.Group;
import romanusyk.ft.data.entity.User;
import romanusyk.ft.data.model.dto.UserStatistics;
import romanusyk.ft.repository.GroupRepository;
import romanusyk.ft.repository.ShareRepository;
import romanusyk.ft.service.interfaces.UserService;

import java.math.BigDecimal;
import java.util.Set;

/**
 * Created by Roman Usyk on 27.11.18.
 */
@Service
public class DebtServiceV2 extends DebtServiceV1 {

    private final ShareRepository shareRepository;

    public DebtServiceV2(UserService userService, GroupRepository groupRepository,
                         ShareRepository shareRepository) {
        super(userService, groupRepository);
        this.shareRepository = shareRepository;
    }

    public UserStatistics getUserStatistics(User u, Set<Group> targetGroups) {
        User user = userService.getUserByID(u.getId());
        BigDecimal debt = shareRepository.getUserDebts(user, targetGroups);
        if (debt == null) {
            debt = BigDecimal.ZERO;
        }
        BigDecimal dep = shareRepository.getUserDeposits(user, targetGroups);
        if (dep == null) {
            dep = BigDecimal.ZERO;
        }
        return new UserStatistics(user, dep.subtract(debt));
    }

}
