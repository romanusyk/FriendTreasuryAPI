package romanusyk.ft.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import romanusyk.ft.data.entity.Event;
import romanusyk.ft.data.entity.User;

import java.util.List;

/**
 * Created by Roman Usyk on 22.11.18.
 */
public interface EventRepository extends JpaRepository<Event, Long> {

    @Query("select e from Event e where e.state not in (3)")
    List<Event> getAllEvents();

}
