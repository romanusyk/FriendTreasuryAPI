package romanusyk.ft.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import romanusyk.ft.data.entity.User;

/**
 * Created by Roman Usyk on 12.09.17.
 */
public class NotValidPasswordException extends ApplicationException {

    public NotValidPasswordException(User user) {
        super(
                String.format(
                        "Password given for user %s is not valid.",
                        user.getUsername()
                ),
                ErrorData.PASSWORD_NOT_VALID
        );
    }

}
