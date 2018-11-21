package romanusyk.ft.exception;

/**
 * Created by Roman Usyk on 12.09.17.
 */
public class EntityNotValidException extends ApplicationException {

    public EntityNotValidException(String message) {
        super(message, ErrorData.ENTITY_NOT_VALID);
    }

}
