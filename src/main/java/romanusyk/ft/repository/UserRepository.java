package romanusyk.ft.repository;

import romanusyk.ft.domain.Group;
import romanusyk.ft.domain.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Created by romm on 28.02.17.
 */
public interface UserRepository extends CrudRepository<User, Integer> {

    List<User> findByUsername(@Param("username") String username);

}
