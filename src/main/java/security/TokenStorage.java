package security;

import domain.User;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by romm on 27.08.17.
 */
public class TokenStorage {

    private Map<Integer, JwtAccessToken> storage;

    public TokenStorage() {
        storage = new HashMap<>();
    }

    public JwtAccessToken getToken(Integer userID) {
        JwtAccessToken token = storage.get(userID);
        if (token != null && token.isExpired()) {
            storage.remove(userID);
            return null;
        }
        return token;
    }

    public JwtAccessToken putToken(Integer userID, String tokenValue) {
        JwtAccessToken token = storage.get(userID);
        if (token == null) {
            token = new JwtAccessToken(tokenValue);
        }
        token.refresh();
        storage.put(userID, token);
        return token;
    }

}
