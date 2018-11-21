package romanusyk.ft.data.entity;

import lombok.*;
import romanusyk.ft.utils.Mappable;
import romanusyk.ft.utils.logging.ObjectRepresentation;

import javax.persistence.*;
import java.util.*;

/**
 * Created by romm on 01.02.17.
 */

@Entity
@Table(name = "users")
@Builder
@AllArgsConstructor
@Getter
@Setter
public class User implements Mappable {

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

    public void updateIfPresent(String username, String email, String phone, String password, String creditCard) {
        if (username != null) {
            this.username = username;
        }
        if (email != null) {
            this.email = email;
        }
        if (phone != null) {
            this.phone = phone;
        }
        if (password != null) {
            this.password = password;
        }
        if (creditCard != null) {
            this.creditCard = creditCard;
        }
    }

    @Override
    public String toString() {
        return ObjectRepresentation.toString(this);
    }

    public String toDetailedString() {
        return ObjectRepresentation.toDetailedString(this);
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

    @Override
    public Map<String, Object> toMap() {
        Map<String, Object> map = new HashMap<>();
        if (id != null) {
            map.put("id", id);
        }
        if (username != null) {
            map.put("username", username);
        }
        if (email != null) {
            map.put("email", email);
        }
        if (phone != null) {
            map.put("phone", phone);
        }
        if (password != null) {
            map.put("password", password);
        }
        if (creditCard != null) {
            map.put("creditCard", creditCard);
        }
        return map;
    }

}
