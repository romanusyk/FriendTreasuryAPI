package romanusyk.ft.domain;

import java.math.BigDecimal;

/**
 * Created by Roman Usyk on 19.01.18.
 */
public class UserStatistics {

    private String username;
    private Integer id;
    private BigDecimal debt;
    private Integer groupCount;

    public UserStatistics() {
    }

    public UserStatistics(String username, Integer id, BigDecimal debt, Integer groupCount) {
        this.username = username;
        this.id = id;
        this.debt = debt;
        this.groupCount = groupCount;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

}
