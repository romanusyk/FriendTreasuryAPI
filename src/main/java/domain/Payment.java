package domain;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * Created by romm on 01.02.17.
 */

@Entity
@Table(name = "payments", indexes = {
        @Index(columnList = "user_from", name = "from_index"),
        @Index(columnList = "user_to", name = "to_index")
})
public class Payment {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_from", nullable = false)
    private User userFrom;

    @ManyToOne
    @JoinColumn(name = "user_to", nullable = false)
    private User userTo;

    @Column(nullable = false)
    private BigDecimal amount;

    public Payment() {

    }

    public Payment(User userFrom, User userTo, BigDecimal amount) {

        this.userFrom = userFrom;
        this.userTo = userTo;
        this.amount = amount;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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
        return "{ id : " + id + ", userFrom : " + userFrom + ", userTo : " + userTo + ", amount : " + amount + "}";
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Payment) {
            Payment u = (Payment) obj;
            return Integer.compare(id, u.getId()) == 0;
        }
        return false;
    }

}
