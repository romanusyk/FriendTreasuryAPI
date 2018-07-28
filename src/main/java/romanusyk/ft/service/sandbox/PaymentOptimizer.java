package romanusyk.ft.service.sandbox;

import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by Roman Usyk on 28.07.18.
 */
public class PaymentOptimizer {

    private static MoneyAmount subtractPayment(MoneyAmount moneyAmount, int amount) {
        if (amount == moneyAmount.amount)
            return null;
        return new MoneyAmount(moneyAmount.user, moneyAmount.amount - amount);
    }

    private static String getState(List<MoneyAmount> from, List<MoneyAmount> to) {
        StringBuilder result = new StringBuilder("");
        for (MoneyAmount moneyAmount : from) {
            result.append(moneyAmount.user).append(moneyAmount.amount);
        }
        for (MoneyAmount moneyAmount : to) {
            result.append(moneyAmount.user).append(moneyAmount.amount);
        }
        return result.toString();
    }

    private static HashMap<String, List<MoneyPayment> > map;

    private static List<MoneyPayment> getOptimalPayments(
            List<MoneyAmount> from, List<MoneyAmount> to) {

        List<MoneyPayment> result = map.get(getState(from, to));
        if (result != null)
            return result;
        else
            result = new LinkedList<>();

        for(int i = 0; i < from.size(); i++) {
            MoneyAmount fMa = from.get(i);
            for(int j = 0; j < to.size(); j++) {
                MoneyAmount tMa = to.get(j);
                MoneyPayment payment = new MoneyPayment(fMa, tMa);
                int paymentAmount = payment.getPaymentAmount();

                List<MoneyAmount> ffrom = new LinkedList<>(from);
                MoneyAmount newFMa = subtractPayment(fMa, paymentAmount);
                if (newFMa == null)
                    ffrom.remove(i);
                else
                    ffrom.set(i, newFMa);
                List<MoneyAmount> tto = new LinkedList<>(to);
                MoneyAmount newTMa = subtractPayment(tMa, paymentAmount);
                if (newTMa == null)
                    tto.remove(j);
                else
                    tto.set(j, newTMa);

                List<MoneyPayment> res = getOptimalPayments(ffrom, tto);
                if (result.isEmpty() || res.size() + 1 < result.size()) {
                    res.add(0, payment);
                    result = new LinkedList<>(res);
                }
            }
        }
        map.put(getState(from, to), result);
        return result;
    }

    public static void main(String[] args) {
        MoneyAmount a1 = new MoneyAmount("a", 50);
        MoneyAmount a2 = new MoneyAmount("b", 50);
        MoneyAmount a3 = new MoneyAmount("c", 50);
        MoneyAmount a4 = new MoneyAmount("d", 50);
        MoneyAmount a5 = new MoneyAmount("e", 50);
        MoneyAmount a6 = new MoneyAmount("f", 50);
        MoneyAmount a7 = new MoneyAmount("g", 50);
        MoneyAmount a8 = new MoneyAmount("h", 50);
        MoneyAmount a9 = new MoneyAmount("i", 50);
        MoneyAmount a10 = new MoneyAmount("k", 50);

        MoneyAmount b1 = new MoneyAmount("l", 50);
        MoneyAmount b2 = new MoneyAmount("m", 50);
        MoneyAmount b3 = new MoneyAmount("n", 50);
        MoneyAmount b4 = new MoneyAmount("o", 50);
        MoneyAmount b5 = new MoneyAmount("p", 50);
        MoneyAmount b6 = new MoneyAmount("r", 50);
        MoneyAmount b7 = new MoneyAmount("s", 50);
        MoneyAmount b8 = new MoneyAmount("t", 50);
        MoneyAmount b9 = new MoneyAmount("y", 50);
        MoneyAmount b10 = new MoneyAmount("x", 50);

        map = new HashMap<>();
        long time = System.currentTimeMillis();
        List<MoneyPayment> result = getOptimalPayments(
                Arrays.asList(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10),
                Arrays.asList(b1, b2, b3, b4, b5, b6, b7, b8, b9, b10)
        );
        System.out.println((System.currentTimeMillis() - time) / 1000);
        System.out.println(map.size());
        for (MoneyPayment moneyPayment : result) {
            System.out.println(String.format(
                    "%s -> %s = %d",
                    moneyPayment.from.user,
                    moneyPayment.to.user,
                    moneyPayment.getPaymentAmount()
            ));
        }
    }
}
