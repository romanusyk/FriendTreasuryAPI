package romanusyk.ft.data.entity;

import lombok.*;
import romanusyk.ft.utils.logging.ObjectRepresentation;

import javax.persistence.*;
import java.math.BigDecimal;
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
@AllArgsConstructor
@Getter
@Setter
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
    @Builder.Default
    private Long timestamp = new Date().getTime();

    @Column
    private double longitude;

    @Column
    private double latitude;

    public Payment() {
        timestamp = new Date().getTime();
    }

    public void updateIfPresent(BigDecimal amount, String description) {
        if (amount != null) {
            this.amount = amount;
        }
        if (description != null) {
            this.description = description;
        }
    }

    @Override
    public String toString() {
        return ObjectRepresentation.toString(this);
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

        private Integer id;
        private User userFrom;
        private User userTo;
        private Group group;
        private BigDecimal amount;
        private String description;
        private Long timestamp = new Date().getTime();
        private double longitude;
        private double latitude;

        public PaymentBuilder id(Integer id) {
            this.id = id;
            return this;
        }

        public PaymentBuilder userFrom(User userFrom) {
            this.userFrom = userFrom;
            return this;
        }

        public PaymentBuilder userTo(User userTo) {
            this.userTo = userTo;
            return this;
        }

        public PaymentBuilder group(Group group) {
            this.group = group;
            return this;
        }

        public PaymentBuilder amount(BigDecimal amount) {
            this.amount = amount;
            return this;
        }

        public PaymentBuilder description(String description) {
            this.description = description;
            return this;
        }

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

        public PaymentBuilder longitude(double longitude) {
            this.longitude = longitude;
            return this;
        }

        public PaymentBuilder latitude(double latitude) {
            this.latitude = latitude;
            return this;
        }

        public Payment build() {
            return new Payment(
                    this.id,
                    this.userFrom,
                    this.userTo,
                    this.group,
                    this.amount,
                    this.description,
                    this.timestamp,
                    this.longitude,
                    this.latitude
            );
        }
    }

    public static PaymentBuilder builder() {
        return new PaymentBuilder();
    }
}
