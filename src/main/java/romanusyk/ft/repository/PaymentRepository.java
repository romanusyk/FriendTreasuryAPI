package romanusyk.ft.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import romanusyk.ft.domain.Debt;
import romanusyk.ft.domain.Payment;
import romanusyk.ft.domain.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by romm on 16.03.17.
 */
public interface PaymentRepository extends CrudRepository<Payment, Integer> {

    Page<Payment> findAll(Specification<Payment> specification, Pageable pageable);

    List<Payment> findAll(Specification<Payment> specification);

    @Query("select sum(p.amount) from Payment p where p.userFrom = ?1")
    BigDecimal getUserOutcome(User user);

    @Query("select sum(p.amount) from Payment p where p.userTo = ?1")
    BigDecimal getUserIncome(User user);

}
