package romanusyk.ft.domain;

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
    private Long timestamp;

    @Column
    private double longitude;

    @Column
    private double latitude;

    public Payment() {
        this.timestamp = new Date().getTime();
    }

    public Payment(BigDecimal amount) {
        this();
        this.amount = amount;
    }

    public Payment(User userFrom, User userTo, Group group, BigDecimal amount, String description, double longitude, double latitude) {
        this();
        this.userFrom = userFrom;
        this.userTo = userTo;
        this.group = group;
        this.amount = amount;
        this.description = description;
        this.longitude = longitude;
        this.latitude = latitude;
    }

    public Payment(User userFrom, User userTo, Group group, BigDecimal amount, String description, Date date, double longitude, double latitude) {
        this(userFrom, userTo, group, amount, description, longitude, latitude);
        this.timestamp = date == null ? new Date().getTime() : date.getTime();
    }

    public Payment(User userFrom, User userTo, Group group, BigDecimal amount, String description, Long timestamp, double longitude, double latitude) {
        this(userFrom, userTo, group, amount, description, longitude, latitude);
        this.timestamp = timestamp == null ? new Date().getTime() : timestamp;
    }

    @Override
    public String toString() {
        DecimalFormat df = new DecimalFormat();
        df.setMaximumFractionDigits(2);
        return String.format(
                "{id: %d, key: (%s: %s -> %s), amount: %s, time: %d}",
                id,
                group.getTitle(),
                userFrom.getUsername(),
                userTo.getUsername(),
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

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
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
