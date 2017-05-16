package domain;

import com.fasterxml.jackson.annotation.JsonSubTypes;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

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

    @Column
    private String description;

    @Column
    private Date date;

    public Payment() {

    }

    public Payment(User userFrom, User userTo, BigDecimal amount, String description, Date date) {
        this.userFrom = userFrom;
        this.userTo = userTo;
        this.amount = amount;
        this.description = description;
        this.date = date;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "" + id + ": (" + userFrom + " -> " + userTo + ") of " + amount + ": " + description + " at: " + date;
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
