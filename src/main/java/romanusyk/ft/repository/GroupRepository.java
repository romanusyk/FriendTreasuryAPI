package romanusyk.ft.repository;

import romanusyk.ft.domain.Group;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by romm on 29.08.17.
 */
public interface GroupRepository extends CrudRepository<Group, Integer> {

    Group findByTitle(String string);

}
