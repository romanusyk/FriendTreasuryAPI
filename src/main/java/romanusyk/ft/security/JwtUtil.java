package romanusyk.ft.security;

import io.jsonwebtoken.Claims;
import romanusyk.ft.data.model.dto.UserDTO;

/**
 * Created by Roman Usyk on 17.09.17.
 */
public interface JwtUtil {

    boolean tokenIsExpired(String token);

    Claims getClamsFromToken(String token);

    UserDTO getUserFromClaims(Claims claims);

    long getExpireTimeFromClaims(Claims claims);

    JwtAccessToken generateToken(UserDTO user);

}
