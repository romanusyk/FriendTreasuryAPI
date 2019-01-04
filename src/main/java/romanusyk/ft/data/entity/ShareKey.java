package romanusyk.ft.data.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;
import romanusyk.ft.utils.logging.ObjectRepresentation;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;
import java.util.Objects;

/**
 * Created by Roman Usyk on 26.11.18.
 */
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ShareKey implements Serializable {

    @ManyToOne
    @JoinColumn(name = "puser", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "event", nullable = false)
    private Event event;

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof ShareKey) {
            ShareKey e = (ShareKey) obj;
            return Objects.equals(hashCode(), e.hashCode());
        }
        return false;
    }

    @Override
    public int hashCode() {
        int userId = user == null ? 0 : (user.getId() == null ? 0 : user.getId());
        int eventId = event == null ? 0 : (event.getId() == null ? 0 : event.getId().intValue());
        return 31 * userId + eventId;
    }

    @Override
    public String toString() {
        return ObjectRepresentation.toString(this);
    }

}
