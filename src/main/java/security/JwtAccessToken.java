package security;

import java.util.Date;

/**
 * Created by romm on 27.08.17.
 */
public class JwtAccessToken {

    public static final long EXPIRE_TIME = 1000 * 60 * 60 * 24;

    private String token;
    private long timestamp;

    public JwtAccessToken(String token) {
        this.token = token;
        timestamp = new Date().getTime();
    }

    public void refresh() {
        timestamp = new Date().getTime();
    }

    public boolean isExpired() {
        return new Date().getTime() - timestamp > EXPIRE_TIME;
    }

    public String getValue() {
        return token;
    }

    public void setValue(String token) {
        this.token = token;
        refresh();
    }

}
