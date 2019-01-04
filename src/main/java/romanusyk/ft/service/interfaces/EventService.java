package romanusyk.ft.service.interfaces;

import romanusyk.ft.data.entity.Event;
import romanusyk.ft.data.entity.User;
import romanusyk.ft.data.model.dto.EventDTO;
import romanusyk.ft.data.model.dto.PaymentDTO;
import romanusyk.ft.data.model.dto.UserDTO;

import java.util.List;
import java.util.Set;

/**
 * Created by Roman Usyk on 22.11.18.
 */
public interface EventService {

    Set<User> getEventMembers(Event event);

    List<EventDTO> getAllEvents();

    EventDTO createEvent(EventDTO eventDTO, UserDTO clientDTO);

    EventDTO updateEvent(EventDTO eventDTO, UserDTO clientDTO);

    void deleteEvent(Long eventId, UserDTO clientDTO);

}
