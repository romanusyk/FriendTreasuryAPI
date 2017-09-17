package romanusyk.ft.security;

import io.jsonwebtoken.Claims;
import romanusyk.ft.domain.User;

/**
 * Created by Roman Usyk on 17.09.17.
 */
public interface JwtUtil {
    boolean tokenIsExpired(String token);

    Claims getClamsFromToken(String token);

    User getUserFromClaims(Claims claims);

    long getExpireTimeFromClaims(Claims claims);

    JwtAccessToken generateToken(User user);
}
