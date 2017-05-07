package domain;

import java.io.Serializable;

/**
 * Created by romm on 27.02.17.
 */
public class DebtKey implements Serializable {

    private User userFrom;

    private User userTo;

    public DebtKey() {
    }

    public DebtKey(User userFrom, User userTo) {
        this.userFrom = userFrom;
        this.userTo = userTo;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof DebtKey) {
            DebtKey that = (DebtKey) obj;
            return this.userFrom != null && this.userFrom.equals(that.userFrom)
                    && this.userTo != null && this.userTo.equals(that.userTo);
        }
        return false;
    }

    @Override
    public int hashCode() {
        int u1 = userFrom == null ? 0 : userFrom.getId() == null ? 0 : userFrom.getId();
        int u2 = userTo == null ? 0 : userTo.getId() == null ? 0 : userTo.getId();
        return 31 * u1 + u2;
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
}
