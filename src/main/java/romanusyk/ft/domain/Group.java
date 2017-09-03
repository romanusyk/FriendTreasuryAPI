package romanusyk.ft.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by romm on 28.08.17.
 */
@Entity
@Table(name = "groups")
public class Group {

    @Id
    @GeneratedValue
    private Integer id;

    @Column(nullable = false, unique = true, length = 100)
    private String title;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinTable(name = "group_user")
    private Set<User> users;


    public Group() {
    }

    public Group(String title) {

        this.title = title;
        this.users = new HashSet<>();
    }

    public Group(String title, Set<User> users) {

        this.title = title;
        this.users = users;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    @Override
    public String toString() {
        return "{ id: " + id + ", title: \"" + title + "\", users: " + users.toString() + "}";
    }
}
