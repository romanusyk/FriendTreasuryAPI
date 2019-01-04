package romanusyk.ft.data.entity;

import lombok.*;
import romanusyk.ft.utils.Mappable;
import romanusyk.ft.utils.logging.ObjectRepresentation;

import javax.persistence.*;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Created by Roman Usyk on 22.11.18.
 */
@Entity
@Table(name = "events")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Event implements Mappable {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "pgroup")
    private Group group;

    @Column
    private EventState state;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @Builder.Default
    private Set<Event> children = new HashSet<>();

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @Builder.Default
    private Set<Share> shares = new HashSet<>();

    @Column
    private String description;

    @Column
    @Builder.Default
    private Long date = new Date().getTime();

    @Embedded
    private Location location;

    @Column
    private Long lastModifiedAt;

    @ManyToOne
    private User lastModifiedBy;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "event_members")
    @Builder.Default
    private Set<User> members = new HashSet<>();

    @Override
    public String toString() {
        return ObjectRepresentation.toString(this);
    }

    @Override
    public Map<String, Object> toMap() {
        Map<String, Object> map = new HashMap<>();
        if (id != null) {
            map.put("id", id);
        }
        if (group != null) {
            map.put("group", group.getTitle());
        }
        if (state != null) {
            map.put("state", state);
        }
        if (children != null) {
            map.put("children", children.stream().map(Mappable::toMap).collect(Collectors.toList()));
        }
        if (shares != null) {
            map.put("shares", shares.stream().map(Mappable::toMap).collect(Collectors.toList()));
        }
        if (description != null) {
            map.put("description", description);
        }
        if (date != null) {
            map.put("date", date);
        }
        if (lastModifiedAt != null) {
            map.put("lastModifiedAt", lastModifiedAt);
        }
        return map;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Event) {
            Event e = (Event) obj;
            return Objects.equals(id, e.getId());
        }
        return false;
    }

    @Override
    public int hashCode() {
        return id == null ? 0 : id.intValue();
    }

}
