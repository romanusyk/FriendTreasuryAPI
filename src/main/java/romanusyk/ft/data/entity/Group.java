package romanusyk.ft.data.entity;

import lombok.*;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotEmpty;
import romanusyk.ft.utils.Mappable;

import javax.persistence.*;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * Created by romm on 28.08.17.
 */
@Entity
@Table(name = "pgroups")
@Builder
@AllArgsConstructor
@Getter
@Setter
public class Group implements Mappable {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Integer id;

    @NotEmpty
    @Column(nullable = false, length = 100)
    private String title;

    @Length
    @Column(nullable = false, unique = true, length = 21)
    private String name;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinTable(name = "pgroup_user")
    @Builder.Default
    private Set<User> users = new HashSet<>();

    public Group() {
        users = new HashSet<>();
    }

    public void updateIfPresent(String name, String title) {
        if (name != null) {
            this.name = name;
        }
        if (title != null) {
            this.title = title;
        }
    }

    @Override
    public String toString() {
        return String.format(
                "{id: %d, title: \"%s\"}",
                id,
                title
        );
    }

    public String toDetailedString() {
        return String.format(
                "{id: %d, title: \"%s\", users: %s}",
                id,
                title,
                users.toString()
        );
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Group) {
            Group that = (Group) obj;
            return !(this.id == null || that.id == null) && this.id.equals(that.id);
        }
        return false;
    }

    @Override
    public int hashCode() {
        return id == null ? 0 : id;
    }

    @Override
    public Map<String, Object> toMap() {
        Map<String, Object> map = new HashMap<>();
        if (id != null) {
            map.put("id", id);
        }
        if (title != null) {
            map.put("title", title);
        }
        if (name != null) {
            map.put("name", name);
        }
        return map;
    }

}
