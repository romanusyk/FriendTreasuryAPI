package security;

import domain.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.crypto.MacProvider;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;

import java.security.Key;

/**
 * Created by romm on 27.08.17.
 */
@Scope("singleton")
public class JwtUtil {

    private static JwtUtil instance;

    public static JwtUtil getInstance() {
        if (instance == null) {
            instance = new JwtUtil();
        }
        return instance;
    }

//    @Value("${jwt.secret}")
    private static Key secret = MacProvider.generateKey();
    private static final Logger logger = Logger.getLogger(JwtUtil.class);

    private TokenStorage storage;
    private JwtUtil() {
        storage = new TokenStorage();
    }

    public JwtAccessToken getToken(User u) {
        JwtAccessToken token = storage.getToken(u.getId());
        if (token == null) {
            logger.debug(String.format("User %s has not token yet. Creating new token..", u.getUsername()));
            String tokenValue = generateToken(u);
            if (tokenValue == null) {
                logger.error("Failed to create token.");
                return null;
            }
            token = storage.putToken(u.getId(), tokenValue);
            return token;
        } else {
            logger.debug(String.format("User %s already has token %s", u.getUsername(), token.getValue()));
            return token;
        }
    }

    public boolean hasAccess(Integer userID, String userToken) {
        JwtAccessToken token = storage.getToken(userID);
        if (token == null) {
            logger.debug(String.format("User %d is not authorized.", userID));
            return false;
        } else {
            return token.getValue().equals(userToken);
        }
    }

    public static User parseToken(String token) {
        try {
            Claims body = Jwts.parser()
                    .setSigningKey(secret)
                    .parseClaimsJws(token)
                    .getBody();

            User u = new User();
            u.setId((Integer) body.get("id"));
            u.setUsername((String) body.get("username"));

            return u;

        } catch (JwtException | ClassCastException e) {
            return null;
        }
    }

    public static String generateToken(User u) {
        if (u.getUsername() == null || u.getPassword() == null) {
            return null;
        }
        Claims claims = Jwts.claims();
        claims.put("id", u.getId());
        claims.put("username", u.getUsername());

        return Jwts.builder()
                .setClaims(claims)
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }
}
