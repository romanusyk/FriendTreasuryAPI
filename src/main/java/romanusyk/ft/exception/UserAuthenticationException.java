package romanusyk.ft.exception;

/**
 * Created by Roman Usyk on 22.10.17.
 */
public class UserAuthenticationException extends RuntimeException {

    public UserAuthenticationException() {
        super("This functionality is available only for account owner.");
    }

    public UserAuthenticationException(String message) {
        super(message);
    }

}
