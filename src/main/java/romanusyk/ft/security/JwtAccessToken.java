package romanusyk.ft.security;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Date;

/**
 * Created by romm on 27.08.17.
 */
public class JwtAccessToken {

    private String token;

    private long expireTime;

    public JwtAccessToken() {}

    public JwtAccessToken(String token, long expireTime) {
        this.token = token;
        this.expireTime = expireTime;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }


    public long getExpireTime() {
        return expireTime;
    }

    public void setExpireTime(long expireTime) {
        this.expireTime = expireTime;
    }

}
