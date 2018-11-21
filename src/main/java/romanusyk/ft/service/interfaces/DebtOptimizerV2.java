package romanusyk.ft.service.interfaces;

import romanusyk.ft.data.model.value.Debt;
import romanusyk.ft.data.model.dto.UserStatistics;

import java.util.List;

/**
 * Created by Roman Usyk on 08.11.18.
 */
public interface DebtOptimizerV2 {

    List<Debt> getOptimalPayments(List<UserStatistics> users);

}
