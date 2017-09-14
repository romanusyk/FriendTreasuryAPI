package romanusyk.ft.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by romm on 01.02.17.
 */

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Integer id;

    @NotNull
    @Column(unique = true, nullable = false, length = 12)
    private String phone;

    @NotNull
    @Column(unique = true, nullable = false)
    private String username;

    @NotNull
    @Column(nullable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER, mappedBy = "users", cascade = CascadeType.PERSIST)
    private Set<Group> groups;

    @Override
    public String toString() {
        return String.format(
                "{id: %d, username: \"%s\", phone: \"%s\"}",
                id,
                username,
                phone
        );
    }

    public String toDetailedString() {
        return String.format(
                "{id: %d, username: \"%s\", phone: \"%s\", " +
                        "password : \"%s\", groups: %s}",
                id,
                username,
                phone,
                password,
                groups.toString()
        );
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof User) {
            User u = (User) obj;
            return Integer.compare(id, u.getId()) == 0;
        }
        return false;
    }

    public User() {
        this.groups = new HashSet<>();
    }

    public User(String phone, String username, String password) {
        this();
        this.phone = phone;
        this.username = username;
        this.password = password;
    }

    public User(String phone, String username, String password, Set<Group> groups) {
        this(phone, username, password);
        this.groups = groups;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Group> getGroups() {
        return groups;
    }

    public void setGroups(Set<Group> groups) {
        this.groups = groups;
    }
}
