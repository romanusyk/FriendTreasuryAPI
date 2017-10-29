package romanusyk.ft.web;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import romanusyk.ft.domain.Debt;
import romanusyk.ft.domain.Payment;
import romanusyk.ft.domain.PaymentDTO;
import romanusyk.ft.domain.User;
import romanusyk.ft.exception.UserAuthenticationException;
import romanusyk.ft.security.JwtUtil;
import romanusyk.ft.service.interfaces.Optimizer;
import romanusyk.ft.service.interfaces.PaymentService;

import java.lang.invoke.MethodHandles;
import java.util.List;
import java.util.Objects;

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
    private Optimizer optimizer;

    @Autowired
    private JwtUtil jwtUtil;

    @RequestMapping(value = "", method = RequestMethod.GET)
    @PreAuthorize("@securityService.hasRole('user')")
    @ResponseBody
    public Page<Payment> getPayments(
            @RequestParam int page, @RequestParam int size,
            @RequestParam(required = false) Integer userFrom,
            @RequestParam(required = false) Integer userTo,
            @RequestParam(required = false) Integer group
            ) {

        Page<Payment> pageResult = paymentService.getPaymentsPage(page, size, userFrom, userTo, group);
        return pageResult;
    }

    @RequestMapping(value = "/sum", method = RequestMethod.GET)
    @PreAuthorize("@securityService.hasRole('user')")
    @ResponseBody
    public List<Debt> getPaymentSum(
            @RequestParam(required = false) Integer userFrom,
            @RequestParam(required = false) Integer userTo,
            @RequestParam(required = false) Integer group
    ) {

        optimizer.sumPayments(paymentService.getPayments(userFrom, userTo, group), group);
        optimizer.optimizeDebts();
        return optimizer.getDebts();
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    @PreAuthorize("@securityService.hasRole('user')")
    public void makeGroupPayment(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization,
            @RequestBody PaymentDTO paymentDTO
    ) {
        User u = jwtUtil.getUserFromClaims(jwtUtil.getClamsFromToken(authorization));
        if (paymentDTO.getUserFrom() != null) {
            logger.debug(String.format("Rejected. User %d tried to pay from user %d.", u.getId(), paymentDTO.getUserFrom()));
            throw new UserAuthenticationException("userFrom should be null. It is taken from auth token.");
        }
        paymentDTO.setUserFrom(u.getId());
        paymentService.makeGroupPayment(paymentDTO);
    }

    private static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

}
