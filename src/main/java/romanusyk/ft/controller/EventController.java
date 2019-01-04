package romanusyk.ft.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import romanusyk.ft.data.model.dto.DebtDTO;
import romanusyk.ft.data.model.dto.EventDTO;
import romanusyk.ft.data.model.dto.GroupDTO;
import romanusyk.ft.data.model.dto.UserDTO;
import romanusyk.ft.security.JwtUtil;
import romanusyk.ft.service.interfaces.DebtService;
import romanusyk.ft.service.interfaces.EventService;
import romanusyk.ft.utils.converter.UserConverter;

import javax.validation.Valid;
import java.lang.invoke.MethodHandles;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Created by Roman Usyk on 24.11.18.
 */
@CrossOrigin
@RestController
@Api("Event controller")
@RequestMapping("/api/v1/events") // TODO: 12.11.18 add consumes & produce
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;
    private final DebtService debtServiceV2;
    private final JwtUtil jwtUtil;

    @ApiOperation(
            value = "Get group by title",
            produces = "Application/json"
    )
    @GetMapping
    @PreAuthorize("@securityService.hasRole('user')")
    @ResponseBody
    public List<EventDTO> getAllEvents(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization
    ) {
        return eventService.getAllEvents();
    }

    @PostMapping
    @PreAuthorize("@securityService.hasRole('user')")
    @ResponseBody
    public EventDTO createEvent(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization,
            @RequestBody @Valid EventDTO eventDTO
            ) {
        UserDTO client = jwtUtil.getUserFromClaims(jwtUtil.getClamsFromToken(authorization));
        return eventService.createEvent(eventDTO, client);
    }

    @GetMapping(value = "/sum")
    @PreAuthorize("@securityService.hasRole('user')")
    @ResponseBody
    public List<DebtDTO> getPaymentSum(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization,
            @RequestParam(required = false) Integer user,
            @RequestParam(required = false) Integer group
    ) {
        logger.debug("GET /getPaymentSum(" + user + ", " + group + ")");
        UserDTO client = jwtUtil.getUserFromClaims(jwtUtil.getClamsFromToken(authorization));
        Map<GroupDTO, List<DebtDTO> > result = debtServiceV2.getDebtsDTO(user, group, UserConverter.from(client));
        return result.values().stream().flatMap(List::stream).collect(Collectors.toList());
    }

    @PatchMapping
    @PreAuthorize("@securityService.hasRole('user')")
    @ResponseBody
    public EventDTO updateEvent(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization,
            @RequestBody @Valid EventDTO eventDTO
    ) {
        UserDTO client = jwtUtil.getUserFromClaims(jwtUtil.getClamsFromToken(authorization));
        return eventService.updateEvent(eventDTO, client);
    }

    @DeleteMapping
    @PreAuthorize("@securityService.hasRole('user')")
    @ResponseBody
    public void deleteEventByID(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization,
            @RequestParam("id") Long eventId
    ) {
        UserDTO client = jwtUtil.getUserFromClaims(jwtUtil.getClamsFromToken(authorization));
        eventService.deleteEvent(eventId, client);
    }

    private static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

}
