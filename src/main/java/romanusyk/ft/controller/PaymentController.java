package romanusyk.ft.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import romanusyk.ft.data.model.dto.*;
import romanusyk.ft.exception.UserPermissionsException;
import romanusyk.ft.security.JwtUtil;
import romanusyk.ft.service.interfaces.PaymentService;
import romanusyk.ft.utils.converter.UserConverter;

import javax.validation.Valid;
import java.lang.invoke.MethodHandles;
import java.util.Map;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Roman Usyk on 12.09.17.
 */
@CrossOrigin
@RestController
@Api("Payment controller")
@RequestMapping("/api/v1/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;
    private final JwtUtil jwtUtil;

    @GetMapping
    @PreAuthorize("@securityService.hasRole('user')")
    @ResponseBody
    public Page<PaymentDTO> getPayments(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization,
            @RequestParam int page, @RequestParam int size,
            @RequestParam(required = false) Integer userFrom,
            @RequestParam(required = false) Integer userTo,
            @RequestParam(required = false) Integer group
            ) {
        UserDTO client = jwtUtil.getUserFromClaims(jwtUtil.getClamsFromToken(authorization));
        if (Math.random() < 0.1) {
            throw new RuntimeException("Deep One ambushes you!");
        }
        return paymentService.getPaymentsPage(page, size, userFrom, userTo, group, UserConverter.from(client));
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
        Map <GroupDTO, List<DebtDTO> > result = paymentService.getPaymentSumDTO(user, group, UserConverter.from(client));
        return result.values().stream().flatMap(List::stream).collect(Collectors.toList());
    }

    @GetMapping(value = "/sum-as-map")
    @PreAuthorize("@securityService.hasRole('user')")
    @ResponseBody
    public Map<GroupDTO, List<DebtDTO> > getPaymentSumMap(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization,
            @RequestParam(required = false) Integer user,
            @RequestParam(required = false) Integer group
    ) {
        logger.debug("GET /getPaymentSum(" + user + ", " + group + ")");
        UserDTO client = jwtUtil.getUserFromClaims(jwtUtil.getClamsFromToken(authorization));
        return paymentService.getPaymentSumDTO(user, group, UserConverter.from(client));
    }

    @GetMapping(value = "/debts")
    @PreAuthorize("@securityService.hasRole('user')")
    @ResponseBody List<DebtDTO> getPaymentSumForClientByAllGroups(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization
    ) {
        UserDTO client = jwtUtil.getUserFromClaims(jwtUtil.getClamsFromToken(authorization));
        Map <GroupDTO, List<DebtDTO> > result = paymentService.getPaymentSumDTO(client.getId(), 0, UserConverter.from(client));
        return result.values().stream().flatMap(List::stream).collect(Collectors.toList());
    }

    @GetMapping(value = "/debts/{groupId}")
    @PreAuthorize("@securityService.hasRole('user')")
    @ResponseBody List<DebtDTO> getPaymentSumForClientByGroup(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization,
            @PathVariable("groupId") Integer groupId
    ) {
        UserDTO client = jwtUtil.getUserFromClaims(jwtUtil.getClamsFromToken(authorization));
        Map <GroupDTO, List<DebtDTO> > result = paymentService.getPaymentSumDTO(client.getId(), groupId, UserConverter.from(client));
        return result.values().stream().flatMap(List::stream).collect(Collectors.toList());
    }

    @PostMapping
    @PreAuthorize("@securityService.hasRole('user')")
    public void makeGroupPayment(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization,
            @RequestBody @Valid PaymentCreationDTO paymentDTO
    ) {
        UserDTO client = jwtUtil.getUserFromClaims(jwtUtil.getClamsFromToken(authorization));
        if (paymentDTO.getUserFrom() != null) {
            logger.debug(String.format("Rejected. User %d tried to pay from user %d.", client.getId(), paymentDTO.getUserFrom()));
            throw new UserPermissionsException("userFrom should be null. It is taken from auth token.");
        }
        paymentDTO.setUserFrom(client.getId());
        paymentService.makeGroupPayment(paymentDTO);
    }

    @PutMapping
    @ResponseBody
    @PreAuthorize("@securityService.hasRole('user')")
    public PaymentDTO updatePayment(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization,
            @RequestBody PaymentDTO payment
    ) {
        UserDTO client = jwtUtil.getUserFromClaims(jwtUtil.getClamsFromToken(authorization));
        return paymentService.updatePayment(payment, UserConverter.from(client));
    }

    @DeleteMapping
    @PreAuthorize("@securityService.hasRole('user')")
    public void deletePayment(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization,
            @RequestParam Integer paymentID
    ) {
        UserDTO client = jwtUtil.getUserFromClaims(jwtUtil.getClamsFromToken(authorization));
        paymentService.deletePayment(paymentID, UserConverter.from(client));
    }

    private static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

}
