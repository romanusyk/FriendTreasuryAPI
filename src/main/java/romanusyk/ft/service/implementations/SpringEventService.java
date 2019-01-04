package romanusyk.ft.service.implementations;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import romanusyk.ft.data.entity.*;
import romanusyk.ft.data.model.dto.EventDTO;
import romanusyk.ft.data.model.dto.PaymentDTO;
import romanusyk.ft.data.model.dto.UserDTO;
import romanusyk.ft.repository.EventRepository;
import romanusyk.ft.service.interfaces.EventService;
import romanusyk.ft.service.interfaces.UserService;
import romanusyk.ft.utils.events.EventIterator;
import romanusyk.ft.utils.converter.EventConverter;
import romanusyk.ft.utils.converter.UserConverter;
import romanusyk.ft.utils.events.EventUtils;
import sun.security.provider.SHA;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Created by Roman Usyk on 22.11.18.
 */
@Service
@RequiredArgsConstructor
public class SpringEventService implements EventService {

    private final EventRepository eventRepository;
    private final UserService userService;

    @Override
    public Set<User> getEventMembers(Event event) {
        Set<User> members = new HashSet<>();
        new EventIterator<User>().convolveElementLists(
                event,
                e -> e.getShares()
                        .stream()
                        .map(x -> x.getKey().getUser())
                        .collect(Collectors.toList()),
                members
        );
        return members;
    }

    @Override
    public List<EventDTO> getAllEvents() {
        List<Event> events = eventRepository.getAllEvents();
        List<EventDTO> eventDTOs = new LinkedList<>();
        for (Event event: events) {
            eventDTOs.add(EventConverter.to(event));
        }
        return eventDTOs;
    }

    @Override
    public EventDTO createEvent(EventDTO eventDTO, UserDTO clientDTO) {

        if (eventDTO.getId() != null) {
            throw new RuntimeException("exists");
        }

        User client = UserConverter.from(clientDTO);
        client = userService.getUserByID(client.getId());
        Event event = EventConverter.from(eventDTO, client);
        System.out.println(event);
        validateEvent(event, client);

        // Group
        EventUtils.propagateValueDown(
                event,
                Event::getGroup,
                Event::setGroup
        );

        // Date
        EventUtils.propagateValueDown(
                event,
                Event::getDate,
                Event::setDate
        );

        // LastModifiedAt
        event.setLastModifiedAt(new Date().getTime());
        EventUtils.propagateValueDown(
                event,
                Event::getLastModifiedAt,
                Event::setLastModifiedAt
        );

        // LastModifiedBy
        event.setLastModifiedBy(client);
        EventUtils.propagateValueDown(
                event,
                Event::getLastModifiedBy,
                Event::setLastModifiedBy
        );

        eventRepository.save(event);

        return EventConverter.to(event);
    }

    @Override
    public EventDTO updateEvent(EventDTO eventDTO, UserDTO clientDTO) {
        User client = UserConverter.from(clientDTO);
        client = userService.getUserByID(client.getId());
        Event event = EventConverter.from(eventDTO, client);

        if (event.getId() == null) {
            throw new RuntimeException("no id");
        }

        Event existingEvent = eventRepository.findOne(event.getId());
        if (existingEvent == null) {
            throw new RuntimeException("not exists");
        }

        updateExistingEvent(existingEvent, event);
        validateEvent(existingEvent, client);

        eventRepository.save(existingEvent);

        return EventConverter.to(existingEvent);
    }

    private void updateExistingEvent(Event existingEvent, Event event) {
        if (event.getDescription() != null) {
            existingEvent.setDescription(event.getDescription());
        }
        if (event.getDate() != null) {
            existingEvent.setDate(event.getDate());
        }
        if (event.getLocation() != null) {
            existingEvent.setLocation(event.getLocation());
        }
        if (event.getLastModifiedBy() != null) {
            existingEvent.setLastModifiedBy(event.getLastModifiedBy());
        }
        if (event.getLastModifiedAt() != null) {
            existingEvent.setLastModifiedAt(event.getLastModifiedAt());
        }
        existingEvent.setShares(event.getShares());
        existingEvent.setMembers(event.getMembers());
        existingEvent.setState(event.getState());

        Set<Event> oldChildren = existingEvent.getChildren();
        Set<Event> newChildren = event.getChildren();

        Set<Event> toDelete = new HashSet<>(oldChildren);
        toDelete.removeAll(newChildren);

        Set<Event> toAdd = new HashSet<>(newChildren);
        toAdd.removeIf(e -> e.getId() != null);

        Set<Event> modified = new HashSet<>(oldChildren);
        modified.retainAll(newChildren);

        existingEvent.getChildren().removeAll(toDelete);
        existingEvent.getChildren().addAll(toAdd);

        for (Event oldEvent: modified) {
            Event newEvent = event.getChildren().stream()
                    .filter(e -> Objects.equals(e.getId(), oldEvent.getId()))
                    .collect(Collectors.toList()).get(0);
            updateExistingEvent(oldEvent, newEvent);
        }
    }

    private void validateEvent(Event event, User client) {
        if (!event.getMembers().contains(client)) {
            throw new RuntimeException("not member");
        }

        if (event.getGroup() == null) {
            throw new RuntimeException("group");
        }

        if (!EventUtils.checkFieldOnValue(
                event,
                Event::getDescription,
                true,
                null,
                EventUtils.FieldSelectionType.ALL
        )) {
            throw new RuntimeException("description");
        }

        if (!EventUtils.checkFieldOnValue(
                event,
                Event::getDate,
                true,
                null,
                EventUtils.FieldSelectionType.ANY
        )) {
            throw new RuntimeException("description");
        }

        if (!(EventUtils.checkFieldOnValue(
                event,
                Event::getState,
                false,
                EventState.CREATED,
                EventUtils.FieldSelectionType.PARENT
        ) || EventUtils.checkFieldOnValue(
                event,
                Event::getState,
                false,
                EventState.DRAFT,
                EventUtils.FieldSelectionType.PARENT
        ))) {
            throw new RuntimeException("parent state");
        }
        if (!EventUtils.checkFieldOnValue(
                event,
                Event::getState,
                false,
                EventState.CHILD,
                EventUtils.FieldSelectionType.EXCEPT_PARENT
        )) {
            throw new RuntimeException("child state");
        }

        if (!EventUtils.checkFieldOnValue(
                event,
                e -> e.getShares() == null || e.getShares().isEmpty(),
                false,
                false,
                EventUtils.FieldSelectionType.NOT_LEAF
        )) {
            throw new RuntimeException("not leaf");
        }
        if (!EventUtils.checkFieldOnValue(
                event,
                e -> e.getShares() == null || e.getShares().isEmpty(),
                false,
                true,
                EventUtils.FieldSelectionType.LEAF
        )) {
            throw new RuntimeException("leaf");
        }

        if (event.getState() == EventState.CREATED) {
            validateCreatedEvent(event);
        }
    }

    private void validateCreatedEvent(Event event) {
        Set<User> eventMembers = getEventMembers(event);
        Set<User> union = new HashSet<>(event.getMembers());
        union.addAll(eventMembers);
        if (union.size() != eventMembers.size() || union.size() != event.getMembers().size()) {
            throw new RuntimeException("members sets not equal");
        }

        if (!getSharesSum(event).equals(BigDecimal.ZERO)) {
            throw new RuntimeException("sum is non zero");
        }
    }

    private BigDecimal getSharesSum(Event event) {
        BigDecimal sum = BigDecimal.ZERO;
        if (event.getShares() != null) {
            for (Share share: event.getShares()) {
                if (share.getType() == ShareType.DEBT) {
                    sum = sum.subtract(share.getAmount());
                } else {
                    sum = sum.add(share.getAmount());
                }
            }
        }
        if (event.getChildren() != null) {
            for (Event child: event.getChildren()) {
                sum = sum.add(getSharesSum(child));
            }
        }
        return sum;
    }

    @Override
    public void deleteEvent(Long eventId, UserDTO clientDTO) {
        if (eventId == null) {
            throw new RuntimeException("no id");
        }

        eventRepository.delete(eventId);
    }

}
