package romanusyk.ft.data.entity;

import lombok.*;
import romanusyk.ft.utils.Mappable;
import romanusyk.ft.utils.logging.ObjectRepresentation;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

/**
 * Created by Roman Usyk on 22.11.18.
 */
@Entity
@Table(name = "shares")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Share implements Mappable {

    @EmbeddedId
    private ShareKey key;

    @Column
    private BigDecimal amount;

    @Column
    private ShareType type;

    @Override
    public Map<String, Object> toMap() {
        Map<String, Object> map = new HashMap<>();
        if (key != null) {
            if (key.getEvent() != null) {
                map.put("event", key.getEvent().getDescription());
            }
            if (key.getUser() != null) {
                map.put("user", key.getUser().getUsername());
            }
        }
        if (amount != null) {
            map.put("amount", amount);
        }
        if (type != null) {
            map.put("type", type);
        }
        return map;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Share) {
            Share e = (Share) obj;
            return Objects.equals(key, e.getKey());
        }
        return false;
    }

    @Override
    public int hashCode() {
        int keyHashcode = key == null ? 0 : key.hashCode();
        return 31 * keyHashcode + (type == ShareType.DEBT ? 1 : 0);
    }

    @Override
    public String toString() {
        return ObjectRepresentation.toString(this);
    }

}
