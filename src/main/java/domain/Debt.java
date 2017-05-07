package domain;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * Created by romm on 01.02.17.
 */

@Entity
@Table(name = "debts")
@IdClass(DebtKey.class)
public class Debt {

    @ManyToOne
    @JoinColumn(name = "user_from", nullable = false)
    @Id
    private User userFrom;

    @ManyToOne
    @JoinColumn(name = "user_to", nullable = false)
    @Id
    private User userTo;

    @Column(nullable = false)
    private BigDecimal amount;

    public Debt() {

    }

    public Debt(User userFrom, User userTo, BigDecimal amount) {

        this.userFrom = userFrom;
        this.userTo = userTo;
        this.amount = amount;
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

    @Override
    public String toString() {
        return "{ userFrom : " + userFrom + ", userTo : " + userTo + ", amount : " + amount + "}";
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Debt) {
            Debt u = (Debt) obj;
            return new DebtKey(userFrom, userTo).equals(new DebtKey(u.userFrom, u.userTo));
        }
        return false;
    }

}
