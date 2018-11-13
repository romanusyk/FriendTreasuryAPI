package romanusyk.ft.data.entity;

import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * Created by romm on 01.02.17.
 */

@Entity
@Table(name = "users")
@Builder
@AllArgsConstructor
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Integer id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(length = 12, unique = true)
    private String phone;

    @Column(nullable = false)
    private String password;

    @Column(length = 16)
    private String creditCard;

    @ManyToMany(fetch = FetchType.EAGER, mappedBy = "users", cascade = CascadeType.MERGE)
    @Builder.Default
    private Set<Group> groups = new HashSet<>();

    @Column
    private String authorities;

    public User() {
        groups = new HashSet<>();
    }

    @Override
    public String toString() {
        return String.format(
                "{id: %d, username: \"%s\", email: \"%s\", phone: \"%s\"}",
                id,
                username,
                email,
                phone
        );
    }

    public String toDetailedString() {
        return String.format(
                "{id: %d, username: \"%s\", email: \"%s\", phone: \"%s\", " +
                        "password : \"%s\", groups: %s}",
                id,
                username,
                email,
                phone,
                password,
                groups.toString()
        );
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof User) {
            User u = (User) obj;
            return Objects.equals(id, u.getId());
        }
        return false;
    }

    @Override
    public int hashCode() {
        return id == null ? 0 : id;
    }

}
