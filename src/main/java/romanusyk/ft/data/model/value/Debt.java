package romanusyk.ft.data.model.value;

import romanusyk.ft.data.entity.Group;
import romanusyk.ft.data.entity.User;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.Date;

/**
 * Created by romm on 01.02.17.
 */
// TODO: 13.11.18 DTOize
public class Debt {

    private User userFrom;

    private User userTo;

    private Group group;

    private BigDecimal amount;

    private Long timestamp;

    public Debt() {
        amount = new BigDecimal(0);
        timestamp = new Date().getTime();
    }

    public Debt(User userFrom, User userTo, Group group, BigDecimal amount) {
        this();
        this.userFrom = userFrom;
        this.userTo = userTo;
        this.group = group;
        this.amount = amount;
    }

    public Debt(User userFrom, User userTo, Group group, BigDecimal amount, Long timestamp) {
        this(userFrom, userTo, group, amount);
        this.timestamp = timestamp;
    }

    @Override
    public String toString() {
        DecimalFormat df = new DecimalFormat();
        df.setMaximumFractionDigits(2);
        return String.format(
                "{key: %s, amount: %s, time: %d}",
                new DebtKey(userFrom, userTo, group),
                df.format(amount),
                timestamp
        );
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Debt) {
            Debt u = (Debt) obj;
            return new DebtKey(userFrom, userTo, group)
                    .equals(new DebtKey(u.userFrom, u.userTo, u.group));
        }
        return false;
    }

    @Override
    public int hashCode() {
        return new DebtKey(userFrom, userTo, group).hashCode();
    }

    public User getUserFrom() {
        return userFrom;
    }

    public void setUserFrom(User userFrom) {
        this.userFrom = userFrom;
    }

    public User getUserTo() {
        return userTo;
    }

    public void setUserTo(User userTo) {
        this.userTo = userTo;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

    public Long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }

}