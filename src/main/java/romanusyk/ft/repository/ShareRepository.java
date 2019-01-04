package romanusyk.ft.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import romanusyk.ft.data.entity.Group;
import romanusyk.ft.data.entity.Share;
import romanusyk.ft.data.entity.User;
import romanusyk.ft.data.model.dto.UserStatistics;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

/**
 * Created by Roman Usyk on 22.11.18.
 */
public interface ShareRepository extends JpaRepository<Share, Long> {

    @Query("select sum(sh.amount) from Share sh " +
            "where sh.key.user = :user and sh.key.event.group in :groups" +
            " and sh.type = romanusyk.ft.data.entity.ShareType.DEBT")
    BigDecimal getUserDebts(@Param("user") User user, @Param("groups") Set<Group> groupSet);

    @Query("select sum(sh.amount) from Share sh " +
            "where sh.key.user = :user and sh.key.event.group in :groups" +
            " and sh.type = romanusyk.ft.data.entity.ShareType.DEP")
    BigDecimal getUserDeposits(@Param("user") User user, @Param("groups") Set<Group> groupSet);

}
