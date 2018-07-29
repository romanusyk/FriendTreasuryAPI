package romanusyk.ft.service.sandbox;

/**
 * Created by Roman Usyk on 28.07.18.
 */
public class MoneyPayment {

    public MoneyAmount from;
    public MoneyAmount to;

    public MoneyPayment(MoneyAmount from, MoneyAmount to) {
        this.from = from;
        this.to = to;
    }

    public int getPaymentAmount() {
        return Integer.min(from.amount, to.amount);
    }

}
