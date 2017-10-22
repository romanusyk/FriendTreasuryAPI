package romanusyk.ft.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by Roman Usyk on 22.10.17.
 */
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class UserAuthenticationException extends RuntimeException {

    public UserAuthenticationException() {
        super("This functionality is available only for account owner.");
    }

    public UserAuthenticationException(String message) {
        super(message);
    }

}
