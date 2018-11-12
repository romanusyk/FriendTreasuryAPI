package romanusyk.ft.data.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import romanusyk.ft.data.model.value.DebtKey;

import javax.persistence.*;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.Date;

/**
 * Created by romm on 01.02.17.
 */

@Entity
@Table(name = "payments", indexes = {
        @Index(columnList = "user_from", name = "from_index"),
        @Index(columnList = "user_to", name = "to_index"),
        @Index(columnList = "pgroup", name = "pgroup_index")
})
@Data
@NoArgsConstructor
@Builder
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_from", nullable = false)
    private User userFrom;

    @ManyToOne
    @JoinColumn(name = "user_to", nullable = false)
    private User userTo;

    @ManyToOne
    @JoinColumn(name = "pgroup", nullable = false)
    private Group group;

    @Column(nullable = false)
    private BigDecimal amount;

    @Column
    private String description;

    @Column(nullable = false)
    private Long timestamp = new Date().getTime();

    @Column
    private double longitude;

    @Column
    private double latitude;

    @Override
    public String toString() {
        DecimalFormat df = new DecimalFormat();
        df.setMaximumFractionDigits(2);
        return String.format(
                "{id: %d, key: (%s: %s -> %s), amount: %s, time: %d}",
                id,
                group == null ? "null" : group.getTitle(),
                userFrom == null ? "null" : userFrom.getUsername(),
                userTo == null ? "null" : userTo.getUsername(),
                df.format(amount),
                timestamp
        );
    }

    public String toDetailedString() {
        DecimalFormat df = new DecimalFormat();
        df.setMaximumFractionDigits(2);
        return String.format(
                "{id: %d, key: %s, amount: %s, description: %s, time: %d}",
                id,
                new DebtKey(userFrom, userTo, group),
                df.format(amount),
                description,
                timestamp
        );
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Payment) {
            Payment u = (Payment) obj;
            return Integer.compare(id, u.getId()) == 0;
        }
        return false;
    }

    @Override
    public int hashCode() {
        return id == null ? 0 : id;
    }

    public static class PaymentBuilder {

        public PaymentBuilder timestamp(Long timestamp) {
            this.timestamp = timestamp == null ? new Date().getTime() : timestamp;
            return this;
        }

        public PaymentBuilder timestamp(Date date) {
            if (date == null) {
                date = new Date();
            }
            this.timestamp = date.getTime();
            return this;
        }
    }
}
