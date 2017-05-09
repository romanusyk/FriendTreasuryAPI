package repository;

import domain.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Created by romm on 28.02.17.
 */
public interface UserRepository extends CrudRepository<User, Integer> {

    @Query("FROM User u where u.username = :#{#username}")
    List<User> findUserByUsername(@Param("username") String username);

}
