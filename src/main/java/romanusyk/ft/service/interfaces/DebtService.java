package romanusyk.ft.service.interfaces;

import romanusyk.ft.data.entity.Group;
import romanusyk.ft.data.entity.User;
import romanusyk.ft.data.model.dto.DebtDTO;
import romanusyk.ft.data.model.dto.GroupDTO;
import romanusyk.ft.data.model.dto.UserStatistics;
import romanusyk.ft.data.model.value.Debt;

import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Created by Roman Usyk on 27.11.18.
 */
public interface DebtService {

    Map<Group, List<Debt> > getDebts(Integer user, Integer groupID, User client);

    Map<GroupDTO, List<DebtDTO> > getDebtsDTO(Integer user, Integer groupID, User client);

    UserStatistics getUserStatistics(User u, Set<Group> targetGroups);

}
