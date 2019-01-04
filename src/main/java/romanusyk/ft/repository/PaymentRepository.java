package romanusyk.ft.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import romanusyk.ft.data.entity.Group;
import romanusyk.ft.data.entity.Payment;
import romanusyk.ft.data.entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

/**
 * Created by romm on 16.03.17.
 */
public interface PaymentRepository extends JpaRepository<Payment, Integer> {

    Page<Payment> findAll(Specification<Payment> specification, Pageable pageable);

    List<Payment> findAll(Specification<Payment> specification);

    @Query("select sum(p.amount) from Payment p where p.userFrom = :user")
    BigDecimal getUserOutcome(@Param("user") User user);

    @Query("select sum(p.amount) from Payment p where p.userFrom = ?1 and p.group in ?2")
    BigDecimal getUserOutcomeInGroups(User user, Set<Group> groupSet);

    @Query("select sum(p.amount) from Payment p where p.userTo = ?1")
    BigDecimal getUserIncome(User user);

    @Query("select sum(p.amount) from Payment p where p.userTo = ?1 and p.group in ?2")
    BigDecimal getUserIncomeInGroups(User user, Set<Group> groupSet);

}
