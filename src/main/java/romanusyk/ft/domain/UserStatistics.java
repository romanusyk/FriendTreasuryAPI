package romanusyk.ft.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;
import java.util.Set;

/**
 * Created by Roman Usyk on 19.01.18.
 */
public class UserStatistics {

    private String username;

    @JsonIgnore
    private User user;

    @JsonProperty("id")
    private Integer userId;

    private BigDecimal debt;

    private Integer groupCount;

    @JsonIgnore
    private Set<Group> groups;

    public UserStatistics() {
    }

    public UserStatistics(User user, BigDecimal debt) {
        this.username = user.getUsername();
        this.setUser(user);
        this.debt = debt;
        this.setGroups(user.getGroups());
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public BigDecimal getDebt() {
        return debt;
    }

    public void setDebt(BigDecimal debt) {
        this.debt = debt;
    }

    public Integer getGroupCount() {
        return groupCount;
    }

    public void setGroupCount(Integer groupCount) {
        this.groupCount = groupCount;
    }

    public Set<Group> getGroups() {
        return groups;
    }

    public void setGroups(Set<Group> groups) {
        this.groups = groups;
        this.groupCount = groups.size();
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
        this.userId = user.getId();
    }
}
