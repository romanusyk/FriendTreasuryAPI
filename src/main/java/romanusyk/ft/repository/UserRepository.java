package romanusyk.ft.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.QueryByExampleExecutor;
import romanusyk.ft.data.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

/**
 * Created by romm on 28.02.17.
 */
public interface UserRepository extends JpaRepository<User, Integer>, QueryByExampleExecutor<User> {

    User findUserByUsername(@Param("username") String username);

}
