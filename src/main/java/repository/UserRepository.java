package repository;

import domain.User;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by romm on 28.02.17.
 */
public interface UserRepository extends CrudRepository<User, Integer> {

}
