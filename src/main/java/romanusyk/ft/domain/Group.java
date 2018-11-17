package romanusyk.ft.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.validator.constraints.Length;
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
    @Column(nullable = false, length = 100)
    private String title;

    @Length(max = 21)
    @Column(nullable = false, unique = true, length = 21)
    private String name;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinTable(name = "pgroup_user")
    private Set<User> users;


    public Group() {
        this.users = new HashSet<>();
    }

    public Group(String title, String name) {
        this();
        this.title = title;
        this.name = name;
    }

    public Group(String title, String name, Set<User> users) {
        this(title, name);
        this.users = users;
    }

    public void updateFromInstance(Group group) {
        if (group.name != null) {
            this.name = group.name;
        }
        if (group.title != null) {
            this.title = group.title;
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

    public Integer getId() {
        return id;
    }

    public Group setId(Integer id) {
        this.id = id;
        return this;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
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
