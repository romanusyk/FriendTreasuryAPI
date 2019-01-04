package romanusyk.ft.utils.logging;

import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.Map;

import romanusyk.ft.data.entity.*;
import romanusyk.ft.data.model.dto.GroupDTO;
import romanusyk.ft.data.model.value.Debt;
import romanusyk.ft.data.model.value.DebtKey;
import romanusyk.ft.utils.Mappable;

/**
 * Created by Roman Usyk on 19.11.18.
 */
public class ObjectRepresentation {

    public static String toString(Share share) {
        return new ObjectStringBuilder()
                .put("key", share.getKey().toString())
                .put("type", share.getType())
                .put("amount", share.getAmount())
                .build();
    }

    public static String toString(ShareKey shareKey) {
        return new ObjectStringBuilder()
                .put("user", shareKey.getUser().toString())
                .put("event", shareKey.getEvent().getId())
                .build();
    }

    public static String toString(Group group) {
        return new ObjectStringBuilder()
                .put("id", group.getId())
                .put("title", group.getTitle())
                .put("name", group.getName())
                .build();
    }

    public static String toString(Payment payment) {
        DecimalFormat df = new DecimalFormat();
        df.setMaximumFractionDigits(2);
        return String.format(
                "{id: %d, key: (%s: %s -> %s), amount: %s, time: %d}",
                payment.getId(),
                payment.getGroup() == null ? "null" : payment.getGroup().getTitle(),
                payment.getUserFrom() == null ? "null" : payment.getUserFrom().getUsername(),
                payment.getUserTo() == null ? "null" : payment.getUserTo().getUsername(),
                df.format(payment.getAmount()),
                payment.getTimestamp()
        );
    }

    public static String toString(User user) {
        return new ObjectStringBuilder()
                .put("id", user.getId())
                .put("username", user.getUsername())
                .put("email", user.getEmail())
                .put("phone", user.getPhone())
                .put("creditCard", user.getCreditCard())
                .build();
    }

    public static String toString(GroupDTO groupDTO) {
        return new ObjectStringBuilder()
                .put("id", groupDTO.getId())
                .put("title", groupDTO.getTitle())
                .put("name", groupDTO.getName())
                .build();
    }

    public static String toString(DebtKey debtKey) {
        return new ObjectStringBuilder()
                .put("userFrom", debtKey.getUserFrom())
                .put("userTo", debtKey.getUserTo())
                .put("group", debtKey.getGroup())
                .build();
    }

    public static String toString(Debt debt) {
        DecimalFormat df = new DecimalFormat();
        df.setMaximumFractionDigits(2);
        return String.format(
                "{key: %s, amount: %s, time: %d}",
                debt.getKey(),
                df.format(debt.getAmount()),
                debt.getTimestamp()
        );
    }

    public static String toDetailedString(Group group) {
        ObjectStringBuilder builder = new ObjectStringBuilder()
                .put("id", group.getId())
                .put("title", group.getTitle())
                .put("name", group.getName());
        if (group.getUsers() != null) {
            builder.put("users", group.getUsers().stream().map(Mappable::toMap));
        }
        return builder.build();
    }

    public static String toDetailedString(User user) {
        ObjectStringBuilder builder = new ObjectStringBuilder()
                .put("id", user.getId())
                .put("username", user.getUsername())
                .put("email", user.getEmail())
                .put("phone", user.getPhone())
                .put("creditCard", user.getCreditCard());
        if (user.getGroups() != null) {
            builder.put("groups", user.getGroups().stream().map(Mappable::toMap));
        }
        return builder.build();
    }

    private static class ObjectStringBuilder {

        private Map<String, String> map;

        public ObjectStringBuilder() {
            map = new HashMap<>();
        }

        public ObjectStringBuilder put(String name, Object value) {
            if (value != null) {
                map.put(name, value.toString());
            }
            return this;
        }

        public ObjectStringBuilder put(String name, Object value, boolean force) {
            if (value == null) {
                put(name, "null");
            }
            return this;
        }

        public String build() {
            return map.toString();
        }

    }

}
