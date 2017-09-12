package romanusyk.ft.web;

import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import romanusyk.ft.domain.Payment;
import romanusyk.ft.service.PaymentService;

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

    @RequestMapping(value = "", method = RequestMethod.GET)
    @ResponseBody
    public Page<Payment> getPayments(
            @RequestHeader("Authorization") String authorization,
            @RequestParam int page, @RequestParam int size,
            @RequestParam(required = false) Integer userFrom,
            @RequestParam(required = false) Integer userTo,
            @RequestParam(required = false) Integer group
            ) {

        Page<Payment> pageResult = paymentService.getPayments(page, size, userFrom, userTo, group);
        return pageResult;
    }

}
