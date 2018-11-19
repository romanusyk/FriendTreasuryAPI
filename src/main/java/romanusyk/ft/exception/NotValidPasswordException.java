package romanusyk.ft.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import romanusyk.ft.data.entity.User;
import romanusyk.ft.data.model.dto.UserDTO;

/**
 * Created by Roman Usyk on 12.09.17.
 */
public class NotValidPasswordException extends ApplicationException {

    public NotValidPasswordException(UserDTO user) {
        super(
                String.format(
                        "Password given for user %s is not valid.",
                        user.getUsername()
                ),
                ErrorData.PASSWORD_NOT_VALID
        );
    }

}
