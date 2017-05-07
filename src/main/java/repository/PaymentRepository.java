package repository;

import domain.Debt;
import domain.Payment;
import domain.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Created by romm on 16.03.17.
 */
public interface PaymentRepository extends CrudRepository<Payment, Integer> {

    @Query("FROM Payment p where p.userTo = :#{#user}")
    List<Payment> findPaumentsToUser(@Param("user") User userTo);

    @Query("FROM Payment p where p.userFrom = :#{#user}")
    List<Payment> findPaumentsFromUser(@Param("user") User userFrom);

    @Query("SELECT new Debt(P.userFrom, P.userTo, sum(P.amount)) FROM Payment P GROUP BY P.userFrom, P.userTo")
    List<Debt> getDebts();
}
