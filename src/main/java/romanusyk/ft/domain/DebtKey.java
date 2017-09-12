package romanusyk.ft.domain;

import java.io.Serializable;

/**
 * Created by romm on 27.02.17.
 */
public class DebtKey implements Serializable {

    private User userFrom;

    private User userTo;

    private Group group;

    public DebtKey() {
    }

    public DebtKey(User userFrom, User userTo, Group group) {
        this.userFrom = userFrom;
        this.userTo = userTo;
        this.group = group;
    }

    @Override
    public String toString() {
        return String.format(
                "{user_from: %s, user_to: %s, group: %s}",
                userFrom,
                userTo,
                group
        );
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof DebtKey) {
            DebtKey that = (DebtKey) obj;
            return this.userFrom != null && this.userFrom.equals(that.userFrom)
                    && this.userTo != null && this.userTo.equals(that.userTo)
                    && this.group != null && this.group.equals(that.group);
        }
        return false;
    }

    @Override
    public int hashCode() {
        int u1 = userFrom == null ? 0 : userFrom.getId() == null ? 0 : userFrom.getId();
        int u2 = userTo == null ? 0 : userTo.getId() == null ? 0 : userTo.getId();
        int g = group == null ? 0 : group.getId() == null ? 0 : group.getId();
        return 31 * 31 * u1 + 31 * u2 + g;
    }

    public User getUserFrom() {
        return userFrom;
    }

    public void setUserFrom(User userFrom) {
        this.userFrom = userFrom;
    }

    public User getUserTo() {
        return userTo;
    }

    public void setUserTo(User userTo) {
        this.userTo = userTo;
    }

    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }
}
