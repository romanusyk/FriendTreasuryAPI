package romanusyk.ft.exception;

import io.swagger.models.auth.In;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by Roman Usyk on 12.09.17.
 */
@ResponseStatus(HttpStatus.NOT_FOUND)
public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(Integer userID) {
        super(String.format("User with id %s was not found.", userID));
    }

    public UserNotFoundException(String message) {
        super(message);
    }

}
