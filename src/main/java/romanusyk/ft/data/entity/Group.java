package romanusyk.ft.data.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by romm on 28.08.17.
 */
@Entity
@Table(name = "pgroups")
@Data
@NoArgsConstructor
@Builder
public class Group {

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
    private Set<User> users = new HashSet<>();

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

}
