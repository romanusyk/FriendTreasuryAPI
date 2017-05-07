package domain;

import org.apache.log4j.Logger;

import java.math.BigDecimal;

/**
 * Created by romm on 06.02.17.
 */
public class PaymentDTO {

    private static final Logger logger = Logger.getLogger(PaymentDTO.class);

    private Integer userFrom;
    private Integer[] usersTo;
    private BigDecimal amount;
    private Integer shallIPayForMyself;

    public PaymentDTO() {
    }

    public PaymentDTO(Integer userFrom, Integer[] usersTo, BigDecimal amount) {
        this.userFrom = userFrom;
        this.usersTo = usersTo;
        this.amount = amount;
        this.shallIPayForMyself = 1;
    }

    public PaymentDTO(Integer userFrom, Integer[] usersTo, BigDecimal amount, Integer shallIPayForMyself) {
        this.userFrom = userFrom;
        this.usersTo = usersTo;
        this.amount = amount;
        this.shallIPayForMyself = shallIPayForMyself;
    }

    public void validate() {
        setShallIPayForMyself(getShallIPayForMyself());
    }

    public Integer getUserFrom() {
        return userFrom;
    }

    public void setUserFrom(Integer userFrom) {
        this.userFrom = userFrom;
    }

    public Integer[] getUsersTo() {
        return usersTo;
    }

    public void setUsersTo(Integer[] usersTo) {
        this.usersTo = usersTo;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Integer getShallIPayForMyself() {
        return shallIPayForMyself;
    }

    public void setShallIPayForMyself(Integer shallIPayForMyself) {
        if (shallIPayForMyself == 0 || shallIPayForMyself == 1) {
            this.shallIPayForMyself = shallIPayForMyself;
        } else {
            this.shallIPayForMyself = 1;
            logger.error("Trying to set " + shallIPayForMyself + " to 'setShallIPayForMyself' field. Setting default value : " + this.shallIPayForMyself + ".");
        }
    }

}
