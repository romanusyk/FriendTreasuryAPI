package domain;

import javax.persistence.*;

/**
 * Created by romm on 01.02.17.
 */

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue
    private Integer id;

    @Column(unique = true, nullable = false)
    private String username;

    public User() {
    }

    public User(String username) {
        this.username = username;
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

    @Override
    public String toString() {
        return "{ id : " + id + ", username : \"" + username + "\"}";
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof User) {
            User u = (User) obj;
            return Integer.compare(id, u.getId()) == 0;
        }
        return false;
    }
}
