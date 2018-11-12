package romanusyk.ft.domain;

import java.math.BigDecimal;
import java.util.Set;

/**
 * Created by Roman Usyk on 10.03.18.
 */
public class GroupDTO {

    private Integer id;

    private String title;

    private String name;

    private Set<User> users;

    private Integer usersCount;

    private BigDecimal userDebt;

    public Integer getUsersCount() {
        return usersCount;
    }

    public void setUsersCount(Integer usersCount) {
        this.usersCount = usersCount;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getUserDebt() {
        return userDebt;
    }

    public void setUserDebt(BigDecimal userDebt) {
        this.userDebt = userDebt;
    }
}
