package romanusyk.ft.data.model.value;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import romanusyk.ft.data.entity.Group;
import romanusyk.ft.data.entity.User;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.Date;

/**
 * Created by romm on 01.02.17.
 */
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Debt {

    private DebtKey key;

    @Builder.Default
    private BigDecimal amount = BigDecimal.ZERO;

    @Builder.Default
    private Long timestamp = new Date().getTime();

    public Debt() {
        amount = new BigDecimal(0);
        timestamp = new Date().getTime();
    }

    @Override
    public String toString() {
        DecimalFormat df = new DecimalFormat();
        df.setMaximumFractionDigits(2);
        return String.format(
                "{key: %s, amount: %s, time: %d}",
                key,
                df.format(amount),
                timestamp
        );
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Debt) {
            Debt d = (Debt) obj;
            return this.key.equals(d.key);
        }
        return false;
    }

    @Override
    public int hashCode() {
        return key.hashCode();
    }

    public void setKey(User userFrom, User userTo, Group group) {
        this.key = new DebtKey(userFrom, userTo, group);
    }

    public static class DebtBuilder {

        public DebtBuilder key(DebtKey key) {
            this.key = key;
            return this;
        }

        public DebtBuilder key(User userFrom, User userTo, Group group) {
            return this.key(new DebtKey(userFrom, userTo, group));
        }
    }

}
