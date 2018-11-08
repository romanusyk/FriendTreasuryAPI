package romanusyk.ft.service.sandbox;

import romanusyk.ft.domain.Debt;
import romanusyk.ft.domain.UserStatistics;

import java.util.List;

/**
 * Created by Roman Usyk on 08.11.18.
 */
public interface DebtOptimizerV2 {

    List<Debt> getOptimalPayments(List<UserStatistics> users);

}
