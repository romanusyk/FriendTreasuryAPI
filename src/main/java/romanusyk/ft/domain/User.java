package romanusyk.ft.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.Length;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.lang.invoke.MethodHandles;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * Created by romm on 01.02.17.
 */

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Integer id;

    @NotNull
    @Column(unique = true, nullable = false)
    private String username;

    @Email
    @Column(unique = true, nullable = false)
    private String email;

    @Length(min = 8, max = 12)
    @Column(length = 12, unique = true)
    private String phone;

    @NotNull
    @Column(nullable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @Length(min = 16, max = 16)
    @Column(length = 16)
    private String creditCard;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER, mappedBy = "users", cascade = CascadeType.MERGE)
    private Set<Group> groups;

    @Column
    @JsonIgnore
    private String authorities;

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

    public User() {
        this.groups = new HashSet<>();
    }

    public User(String username, String email, String password, String authorities) {
        this();
        this.username = username;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
    }

    public User(String username, String email, String phone, String password, String creditCard, String authorities) {
        this();
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.creditCard = creditCard;
        this.authorities = authorities;
    }

    public User(String username, String email, String phone, String password, String creditCard,
                String authorities, Set<Group> groups) {
        this(username, email, phone, password, creditCard, authorities);
        this.groups = groups;
    }

    public User setId(Integer id) {
        this.id = id;
        return this;
    }

}
