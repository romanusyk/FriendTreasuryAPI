package romanusyk.ft.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import romanusyk.ft.domain.User;

/**
 * Created by Roman Usyk on 12.09.17.
 */
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class NotValidPasswordException extends RuntimeException {

    public NotValidPasswordException(User user) {
        super(
                String.format(
                        "Password given for user %s is not valid.",
                        user.toString()
                )
        );
    }

}
