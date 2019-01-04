package romanusyk.ft.utils.converter;

import romanusyk.ft.data.entity.*;
import romanusyk.ft.data.model.dto.EventDTO;
import romanusyk.ft.data.model.dto.ShareDTO;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Created by Roman Usyk on 24.11.18.
 */
public class EventConverter {

    public static EventDTO to(Event event) {

        List<ShareDTO> debtors = new LinkedList<>();
        List<ShareDTO> depositors = new LinkedList<>();

        for (Share share: event.getShares()) {
            if (share.getType().equals(ShareType.DEBT)) {
                debtors.add(ShareConverter.to(share));
            } else {
                depositors.add(ShareConverter.to(share));
            }
        }

        return EventDTO.builder()
                .id(event.getId())
                .group(GroupConverter.to(event.getGroup()))
                .state(event.getState())
                .members(event.getMembers().stream()
                        .map(UserConverter::to)
                        .collect(Collectors.toList())
                )
                .children(event.getChildren()
                        .stream()
                        .map(EventConverter::to)
                        .collect(Collectors.toList()))
                .debtors(debtors)
                .depositors(depositors)
                .description(event.getDescription())
                .date(event.getDate())
                .location(LocationConverter.to(event.getLocation()))
                .lastModifiedBy(UserConverter.to(event.getLastModifiedBy()))
                .lastModifiedAt(event.getLastModifiedAt())
                .build();
    }

    public static Event from(EventDTO eventDTO, User client) {

        Set<Share> shares = new HashSet<>();
        if (eventDTO.getDebtors() != null) {
            for (ShareDTO shareDTO : eventDTO.getDebtors()) {
                shares.add(ShareConverter.from(shareDTO, ShareType.DEBT, null));
            }
        }
        if (eventDTO.getDepositors() != null) {
            for (ShareDTO shareDTO : eventDTO.getDepositors()) {
                shares.add(ShareConverter.from(shareDTO, ShareType.DEP, null));
            }
        }

        Event event = Event.builder()
                .id(eventDTO.getId())
                .group(GroupConverter.from(eventDTO.getGroup()))
                .state(eventDTO.getState())
                .children(eventDTO.getChildren()
                        .stream()
                        .map(e -> EventConverter.from(e, client))
                        .collect(Collectors.toSet()))
                .shares(shares)
                .description(eventDTO.getDescription())
                .date(eventDTO.getDate())
                .location(LocationConverter.from(eventDTO.getLocation()))
                .lastModifiedBy(client)
                .lastModifiedAt(new Date().getTime())
                .members(eventDTO.getMembers().stream()
                        .map(UserConverter::from)
                        .collect(Collectors.toSet())
                )
                .build();
        for (Share share: event.getShares()) {
            share.getKey().setEvent(event);
        }

        return event;
    }

}
