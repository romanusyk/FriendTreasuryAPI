package romanusyk.ft.web;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import romanusyk.ft.domain.*;
import romanusyk.ft.exception.UserAuthenticationException;
import romanusyk.ft.security.JwtUtil;
import romanusyk.ft.service.interfaces.Optimizer;
import romanusyk.ft.service.interfaces.PaymentService;

import javax.validation.Valid;
import java.lang.invoke.MethodHandles;
import java.util.Map;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * Created by Roman Usyk on 12.09.17.
 */
@CrossOrigin
@RestController
@Api("Payment controller")
@RequestMapping("/api/v1/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private JwtUtil jwtUtil;

    @RequestMapping(value = "", method = RequestMethod.GET)
    @PreAuthorize("@securityService.hasRole('user')")
    @ResponseBody
    public Page<Payment> getPayments(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization,
            @RequestParam int page, @RequestParam int size,
            @RequestParam(required = false) Integer userFrom,
            @RequestParam(required = false) Integer userTo,
            @RequestParam(required = false) Integer group
            ) {
        User client = jwtUtil.getUserFromClaims(jwtUtil.getClamsFromToken(authorization));
        Page<Payment> pageResult = paymentService.getPaymentsPage(page, size, userFrom, userTo, group, client);
        return pageResult;
    }

    @RequestMapping(value = "/sum", method = RequestMethod.GET)
    @PreAuthorize("@securityService.hasRole('user')")
    @ResponseBody
    public Object getPaymentSum(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization,
            @RequestParam(required = false) Integer user,
            @RequestParam(required = false) Integer group,
            @RequestParam(required = false) Integer map
    ) {
        logger.debug("GET /getPaymentSum(" + user + ", " + group + ")");
        User client = jwtUtil.getUserFromClaims(jwtUtil.getClamsFromToken(authorization));
        Map <Group, List<Debt> > result = paymentService.getPaymentSum(user, group, client);
        if (map != null && map == 1) {
            return result;
        }
        return result.values().stream().flatMap(List::stream).collect(Collectors.toList());
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    @PreAuthorize("@securityService.hasRole('user')")
    public void makeGroupPayment(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization,
            @RequestBody @Valid PaymentDTO paymentDTO
    ) {
        User u = jwtUtil.getUserFromClaims(jwtUtil.getClamsFromToken(authorization));
        if (paymentDTO.getUserFrom() != null) {
            logger.debug(String.format("Rejected. User %d tried to pay from user %d.", u.getId(), paymentDTO.getUserFrom()));
            throw new UserAuthenticationException("userFrom should be null. It is taken from auth token.");
        }
        paymentDTO.setUserFrom(u.getId());
        paymentService.makeGroupPayment(paymentDTO);
    }

    @RequestMapping(value = "", method = RequestMethod.PUT)
    @ResponseBody
    @PreAuthorize("@securityService.hasRole('user')")
    public Payment updatePayment(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization,
            @RequestBody Payment payment
    ) {
        User u = jwtUtil.getUserFromClaims(jwtUtil.getClamsFromToken(authorization));
        return paymentService.updatePayment(payment, u);
    }

    @RequestMapping(value = "", method = RequestMethod.DELETE)
    @PreAuthorize("@securityService.hasRole('user')")
    public void deletePayment(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization,
            @RequestParam Integer paymentID
    ) {
        User u = jwtUtil.getUserFromClaims(jwtUtil.getClamsFromToken(authorization));
        paymentService.deletePayment(paymentID, u);
    }

    private static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

}
