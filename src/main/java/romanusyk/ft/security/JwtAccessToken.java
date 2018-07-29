package romanusyk.ft.security;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Date;

/**
 * Created by romm on 27.08.17.
 */
public class JwtAccessToken {

    private String token;

    private long expireTime;

    private Integer userId;

    public JwtAccessToken() {}

    public JwtAccessToken(String token, long expireTime) {
        this.token = token;
        this.expireTime = expireTime;
    }

    public JwtAccessToken(String token, long expireTime, Integer userId) {
        this(token, expireTime);
        this.userId = userId;
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

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

}
