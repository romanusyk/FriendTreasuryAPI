package romanusyk.ft.exception;

/**
 * Created by Roman Usyk on 22.10.17.
 */
public class UserPermissionsException extends ApplicationException {

    public UserPermissionsException() {
        super("This functionality is available only for account owner.", ErrorData.USER_AUTHENTICATION_ERROR);
    }

    public UserPermissionsException(String message) {
        super(message, ErrorData.USER_AUTHENTICATION_ERROR);
    }

}
