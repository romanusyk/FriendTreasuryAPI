package web;

import domain.Payment;
import domain.PaymentDTO;
import domain.User;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import repository.Optimizer;
import service.PaymentService;
import service.SpringUserService;
import service.UserService;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.util.*;

/**
 * Created by romm on 01.02.17.
 */

@RestController
public class TestController {

//    @Autowired
//    @Qualifier("simpleUserServiceBean")
//    private UserService userService;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    @Qualifier("springUserServiceBean")
    private UserService userService;

    @Autowired
    private Optimizer optimizer;

    private static final Logger logger = Logger.getLogger(TestController.class);

    /**
     * Sanity check
     * @return
     */
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String hello() {
        return "Hello!";
    }

    /**
     * Demo init database
     * @return
     */
    @RequestMapping(value = "/init", method = RequestMethod.GET)
    public String init() {
        userService.init();
        paymentService.init();
        return "Initialized!";
    }

    @RequestMapping(value = "/users/{id}", method = RequestMethod.GET)
    public ResponseEntity<User> getUserById(@PathVariable("id") Integer id) {
        User user = userService.getUserByID(id);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @RequestMapping(value = "/users", method = RequestMethod.POST)
    public ResponseEntity<Integer> addUser(@RequestBody User user) {
        logger.info("Persisting user : " + user);
        userService.createUser(user);
        return new ResponseEntity<>(user.getId(), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/users", method = RequestMethod.PATCH)
    public ResponseEntity<Integer> valdateUser(@RequestBody User user) {
        logger.info("Validating user : " + user);
        Integer validUserId = userService.validateUser(user);
        return new ResponseEntity<>(validUserId, HttpStatus.OK);
    }

    @RequestMapping(value = "/user_debts/{id}", method = RequestMethod.GET)
    public ResponseEntity<Map<Integer, BigDecimal>> getUserDebts(@PathVariable("id") Integer id) {
        Map<Integer, BigDecimal> result = paymentService.getUserPayments(id);
        if (result == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(value = "/user_debts/{id1}/{id2}", method = RequestMethod.GET)
    public ResponseEntity<List<Payment>> getDebtsBeteenUsers(@PathVariable("id1") Integer id1, @PathVariable("id2") Integer id2) {
        List<Payment> result = paymentService.getPaymentsBetweenUsers(id1, id2);
        if (result == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(value = "payment/", method = RequestMethod.POST)
    public ResponseEntity<Boolean> makeGroupPayment(@RequestBody PaymentDTO paymentDTO) {
        boolean success = false;
        paymentDTO.validate();
        try{
            success = paymentService.makeGroupPayment(paymentDTO);
        } catch (RuntimeException e) {
            logger.error("Runtime exception while adding group payment!");
            logger.error(e);
        }
        if (success) {
            logger.info(
                    "Transaction succeed! "
                            + "User with id = " + paymentDTO.getUserFrom()
                            + " payed for users with id = " + Arrays.toString(paymentDTO.getUsersTo())
                            + " " + paymentDTO.getAmount() + " hryvnas."
            );
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            logger.error("Transaction failed from user " + paymentDTO.getUserFrom() + " to users " + Arrays.toString(paymentDTO.getUsersTo()));
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "optimize/", method = RequestMethod.GET)
    public String optimize() {
        optimizer.calculateDebts();
        return "Optimized!";
    }
}
