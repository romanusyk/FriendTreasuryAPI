package romanusyk.ft.security;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Created by romm on 27.08.17.
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class JwtAccessToken {

    private String token;
    private long expireTime;
    private Integer userId;

}
