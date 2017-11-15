package romanusyk.ft.repository;

import org.springframework.data.repository.query.QueryByExampleExecutor;
import romanusyk.ft.domain.Group;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by romm on 29.08.17.
 */
public interface GroupRepository extends CrudRepository<Group, Integer>, QueryByExampleExecutor<Group> {

    Group findByName(String name);

}
