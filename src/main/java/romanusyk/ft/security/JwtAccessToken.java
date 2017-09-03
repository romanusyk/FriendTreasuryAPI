package romanusyk.ft.security;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Date;

/**
 * Created by romm on 27.08.17.
 */
public class JwtAccessToken {

    public static final long EXPIRE_TIME = 1000 * 60 * 60 * 24;

    private String token;

    private long expireTime;

    public JwtAccessToken(String token) {
        this.token = token;
        expireTime = new Date().getTime() + EXPIRE_TIME;
    }

    public void refresh() {
        expireTime = new Date().getTime() + EXPIRE_TIME;
    }

    @JsonIgnore
    public boolean isExpired() {
        return new Date().getTime() > expireTime;
    }

    public String getValue() {
        return token;
    }

    public void setValue(String token) {
        this.token = token;
        refresh();
    }

    public long getExpireTime() {
        return expireTime;
    }

    public void setExpireTime(long expireTime) {
        this.expireTime = expireTime;
    }

}
