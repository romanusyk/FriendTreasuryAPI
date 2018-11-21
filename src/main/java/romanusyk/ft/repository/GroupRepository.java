package romanusyk.ft.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.QueryByExampleExecutor;
import romanusyk.ft.data.entity.Group;

/**
 * Created by romm on 29.08.17.
 */
public interface GroupRepository extends JpaRepository<Group, Integer>, QueryByExampleExecutor<Group> {

    Group findByName(String name);

}
