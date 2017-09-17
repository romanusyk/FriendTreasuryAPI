package romanusyk.ft.web;

import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import romanusyk.ft.domain.Debt;
import romanusyk.ft.domain.Payment;
import romanusyk.ft.service.interfaces.Optimizer;
import romanusyk.ft.service.interfaces.PaymentService;

import java.util.List;

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

    @RequestMapping(value = "", method = RequestMethod.GET)
    @ResponseBody
    public Page<Payment> getPayments(
            @RequestHeader("Authorization") String authorization,
            @RequestParam int page, @RequestParam int size,
            @RequestParam(required = false) Integer userFrom,
            @RequestParam(required = false) Integer userTo,
            @RequestParam(required = false) Integer group
            ) {

        Page<Payment> pageResult = paymentService.getPaymentsPage(page, size, userFrom, userTo, group);
        return pageResult;
    }

    @RequestMapping(value = "/sum", method = RequestMethod.GET)
    @ResponseBody
    public List<Debt> getPaymentSum(
            @RequestHeader("Authorization") String authorization,
            @RequestParam(required = false) Integer userFrom,
            @RequestParam(required = false) Integer userTo,
            @RequestParam(required = false) Integer group
    ) {

        optimizer.sumPayments(paymentService.getPayments(userFrom, userTo, group), group);
        optimizer.optimizeDebts();
        return optimizer.getDebts();
    }

}
