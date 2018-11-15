package romanusyk.ft.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by Roman Usyk on 22.10.17.
 */
public class UserAuthenticationException extends ApplicationException {

    public UserAuthenticationException() {
        super("This functionality is available only for account owner.", ErrorData.USER_AUTHENTICATION_ERROR);
    }

    public UserAuthenticationException(String message) {
        super(message, ErrorData.USER_AUTHENTICATION_ERROR);
    }

}
