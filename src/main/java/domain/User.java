package domain;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by romm on 01.02.17.
 */

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue
    private Integer id;

    @Column(unique = true, nullable = false, length = 12)
    private String phone;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "users", cascade = CascadeType.PERSIST)
    private Set<Group> groups;

    @Override
    public String toString() {
        return "{ id : " + id +
               ", username : \"" + username +
               "\", phone : " + phone +
               ", pass : \"" + password +
               "\", groups: [" + groups.stream().toString() + "]}";
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

    }

    public User(String phone, String username, String password) {
        this.phone = phone;
        this.username = username;
        this.password = password;
        this.groups = new HashSet<>();
    }

    public User(String phone, String username, String password, Set<Group> groups) {
        this.phone = phone;
        this.username = username;
        this.password = password;
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
