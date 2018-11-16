package romanusyk.ft.security;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import romanusyk.ft.data.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.io.UnsupportedEncodingException;
import java.lang.invoke.MethodHandles;
import java.util.Date;

/**
 * Created by romm on 27.08.17.
 */
@Component
public class JwtUtilImpl implements JwtUtil {

    @Value("${ft.token.secret}")
    private String secret;

    public static final long EXPIRE_TIME = 60 * 60 * 24;
    private static final org.slf4j.Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

    @Override
    public boolean tokenIsExpired(String token) {
        return new Date().getTime() > 1000 * getExpireTimeFromClaims(getClamsFromToken(token));
    }

    @Override
    public Claims getClamsFromToken(String token) {

        if (token == null)
            return null;

        try {
            return Jwts.parser()
                    .setSigningKey(secret.getBytes("UTF-8"))
                    .parseClaimsJws(token)
                    .getBody();
        } catch (JwtException | ClassCastException | UnsupportedEncodingException e) {
            logger.error(String.format(
                    "Failed to parse token %s. Error: %s",
                    token,
                    e.getMessage()
            ));
            return null;
        }
    }

    @Override
    public User getUserFromClaims(Claims claims) {

        if (claims == null)
            return null;

        User u = new User();
        try {
            u.setId((Integer) claims.get("id"));
            u.setUsername((String) claims.get("username"));
            return u;
        } catch (JwtException | ClassCastException e) {
            logger.error(String.format(
                    "Failed to get %s fromCreation claims: %s. Error: %s",
                    "User",
                    claims == null ? "null" : claims.toString(),
                    e.getMessage()
            ));
            return null;
        }
    }

    @Override
    public long getExpireTimeFromClaims(Claims claims) {

        if (claims == null)
            return 0;

        try {
            return ((Integer) claims.get("expireTime")).longValue();
        } catch (JwtException | ClassCastException e) {
            logger.error(String.format(
                    "Failed to get %s fromCreation claims: %s. Error: %s",
                    "expireTime",
                    claims.toString(),
                    e.getMessage()
            ));
            return 0;
        }
    }

    protected String generateToken(User u, long expireTime) {
        if (u.getUsername() == null || u.getPassword() == null) {
            return null;
        }
        Claims claims = Jwts.claims();
        claims.put("id", u.getId());
        claims.put("username", u.getUsername());
        claims.put("expireTime", expireTime);

        try {
            return Jwts.builder()
                    .setClaims(claims)
                    .signWith(SignatureAlgorithm.HS512, secret.getBytes("UTF-8"))
                    .compact();
        } catch (UnsupportedEncodingException e) {
            logger.warn(e.getMessage());
            return Jwts.builder()
                    .setClaims(claims)
                    .signWith(SignatureAlgorithm.HS512, secret.getBytes())
                    .compact();
        }
    }

    @Override
    public JwtAccessToken generateToken(User user) {
        long expireTime = new Date().getTime() / 1000 + EXPIRE_TIME;
        String token = generateToken(user, expireTime);
        return new JwtAccessToken(token, expireTime, user.getId());
    }
}
