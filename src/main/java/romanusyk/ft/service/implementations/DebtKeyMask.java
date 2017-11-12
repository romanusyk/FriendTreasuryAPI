package romanusyk.ft.service.implementations;

/**
 * Created by Roman Usyk on 12.11.17.
 */
@Deprecated
public class DebtKeyMask {

    private static final int USER_FROM = 1;
    private static final int USER_TO = 2;
    private static final int GROUP = 4;

    private int mask;

    public DebtKeyMask() {}

    public DebtKeyMask(int mask) {
        this.mask = mask;
    }

    public DebtKeyMask(boolean isUserFrom, boolean isUserTo, boolean isGroup) {
        mask += isUserFrom ? USER_FROM : 0;
        mask += isUserTo ? USER_TO : 0;
        mask += isGroup ? GROUP : 0;
    }

    public int getMask() {
        return mask;
    }

    public boolean isUserFrom() {
        return (mask & USER_FROM) > 0;
    }

    public boolean isUserTo() {
        return (mask & USER_TO) > 0;
    }

    public boolean isGroup() {
        return (mask & GROUP) > 0;
    }

    public void setUserFrom(boolean newValue) {
        mask &= 7 - USER_FROM;
        mask += newValue ? USER_FROM : 0;
    }

    public void setUserTo(boolean newValue) {
        mask &= 7 - USER_TO;
        mask += newValue ? USER_TO : 0;
    }

    public void setGroup(boolean newValue) {
        mask &= 7 - GROUP;
        mask += newValue ? GROUP : 0;
    }

}
