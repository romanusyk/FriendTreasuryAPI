package romanusyk.ft.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by romm on 28.08.17.
 */
@Entity
@Table(name = "pgroups")
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Integer id;

    @NotEmpty
    @NotNull
    @Column(nullable = false, unique = true, length = 100)
    private String title;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinTable(name = "pgroup_user")
    private Set<User> users;


    public Group() {
        this.users = new HashSet<>();
    }

    public Group(String title) {
        this();
        this.title = title;
    }

    public Group(String title, Set<User> users) {
        this(title);
        this.users = users;
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
}
