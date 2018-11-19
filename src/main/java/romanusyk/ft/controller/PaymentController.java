package romanusyk.ft.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import romanusyk.ft.data.model.dto.DebtDTO;
import romanusyk.ft.data.model.dto.GroupDTO;
import romanusyk.ft.data.model.dto.PaymentCreationDTO;
import romanusyk.ft.data.model.dto.PaymentDTO;
import romanusyk.ft.data.model.value.Debt;
import romanusyk.ft.data.entity.Group;
import romanusyk.ft.data.entity.Payment;
import romanusyk.ft.data.entity.User;
import romanusyk.ft.exception.UserPermissionsException;
import romanusyk.ft.security.JwtUtil;
import romanusyk.ft.service.interfaces.PaymentService;
import romanusyk.ft.utils.converter.DebtConverter;
import romanusyk.ft.utils.converter.GroupConverter;
import romanusyk.ft.utils.converter.PaymentConverter;

import javax.validation.Valid;
import java.lang.invoke.MethodHandles;
import java.util.HashMap;
import java.util.LinkedList;
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
public class PaymentController {

    private final PaymentService paymentService;
    private final JwtUtil jwtUtil;

    @Autowired
    public PaymentController(PaymentService paymentService, JwtUtil jwtUtil) {
        this.paymentService = paymentService;
        this.jwtUtil = jwtUtil;
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    @PreAuthorize("@securityService.hasRole('user')")
    @ResponseBody
    public Page<PaymentDTO> getPayments(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization,
            @RequestParam int page, @RequestParam int size,
            @RequestParam(required = false) Integer userFrom,
            @RequestParam(required = false) Integer userTo,
            @RequestParam(required = false) Integer group
            ) {
        User client = jwtUtil.getUserFromClaims(jwtUtil.getClamsFromToken(authorization));
        Page<Payment> pageResult = paymentService.getPaymentsPage(page, size, userFrom, userTo, group, client);
//        if (Math.random() < 0.1) {
//            throw new RuntimeException("Deep One ambushes you!");
//        }
        return pageResult.map(PaymentConverter::to);
    }

    @RequestMapping(value = "/sum", method = RequestMethod.GET)
    @PreAuthorize("@securityService.hasRole('user')")
    @ResponseBody
    public List<DebtDTO> getPaymentSum(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization,
            @RequestParam(required = false) Integer user,
            @RequestParam(required = false) Integer group
    ) {
        logger.debug("GET /getPaymentSum(" + user + ", " + group + ")");
        User client = jwtUtil.getUserFromClaims(jwtUtil.getClamsFromToken(authorization));
        Map <Group, List<Debt> > result = paymentService.getPaymentSum(user, group, client);

        return result.values().stream().flatMap(List::stream).map(DebtConverter::to).collect(Collectors.toList());
    }

    @RequestMapping(value = "/summap", method = RequestMethod.GET)
    @PreAuthorize("@securityService.hasRole('user')")
    @ResponseBody
    public Map<GroupDTO, List<DebtDTO> > getPaymentSumMap(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization,
            @RequestParam(required = false) Integer user,
            @RequestParam(required = false) Integer group
    ) {
        logger.debug("GET /getPaymentSum(" + user + ", " + group + ")");
        User client = jwtUtil.getUserFromClaims(jwtUtil.getClamsFromToken(authorization));
        Map <Group, List<Debt> > result = paymentService.getPaymentSum(user, group, client);

        Map<GroupDTO, List<DebtDTO> > convertedResult = new HashMap<>();
        for (Group g: result.keySet()) {
            GroupDTO gDTO = GroupConverter.to(g);
            convertedResult.put(gDTO, new LinkedList<>());
            for (Debt d: result.get(g)) {
                DebtDTO dDTO = DebtConverter.to(d);
                convertedResult.get(gDTO).add(dDTO);
            }
        }

        return convertedResult;
    }

    @RequestMapping(value = "/debts", method = RequestMethod.GET)
    @PreAuthorize("@securityService.hasRole('user')")
    @ResponseBody List<Debt> getPaymentSumForClientByAllGroups(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization
    ) {
        User client = jwtUtil.getUserFromClaims(jwtUtil.getClamsFromToken(authorization));
        Map <Group, List<Debt> > result = paymentService.getPaymentSum(client.getId(), 0, client);
        return result.values().stream().flatMap(List::stream).collect(Collectors.toList());
    }

    @RequestMapping(value = "/debts/{groupId}", method = RequestMethod.GET)
    @PreAuthorize("@securityService.hasRole('user')")
    @ResponseBody List<Debt> getPaymentSumForClientByGroup(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization,
            @PathVariable("groupId") Integer groupId
    ) {
        User client = jwtUtil.getUserFromClaims(jwtUtil.getClamsFromToken(authorization));
        Map <Group, List<Debt> > result = paymentService.getPaymentSum(client.getId(), groupId, client);
        return result.values().stream().flatMap(List::stream).collect(Collectors.toList());
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    @PreAuthorize("@securityService.hasRole('user')")
    public void makeGroupPayment(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization,
            @RequestBody @Valid PaymentCreationDTO paymentDTO
    ) {
        User u = jwtUtil.getUserFromClaims(jwtUtil.getClamsFromToken(authorization));
        if (paymentDTO.getUserFrom() != null) {
            logger.debug(String.format("Rejected. User %d tried to pay fromCreation user %d.", u.getId(), paymentDTO.getUserFrom()));
            throw new UserPermissionsException("userFrom should be null. It is taken fromCreation auth token.");
        }
        paymentDTO.setUserFrom(u.getId());
        paymentService.makeGroupPayment(paymentDTO);
    }

    @RequestMapping(value = "", method = RequestMethod.PUT)
    @ResponseBody
    @PreAuthorize("@securityService.hasRole('user')")
    // TODO: 13.11.18 PaymentDTO
    public Payment updatePayment(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization,
            @RequestBody Payment payment
    ) {
        User u = jwtUtil.getUserFromClaims(jwtUtil.getClamsFromToken(authorization));
        return paymentService.updatePayment(payment, u);
    }

    @RequestMapping(value = "", method = RequestMethod.DELETE)
    @PreAuthorize("@securityService.hasRole('user')")
    // TODO: 13.11.18 PaymentDTO
    public void deletePayment(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization,
            @RequestParam Integer paymentID
    ) {
        User u = jwtUtil.getUserFromClaims(jwtUtil.getClamsFromToken(authorization));
        paymentService.deletePayment(paymentID, u);
    }

    private static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

}
