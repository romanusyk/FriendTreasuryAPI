package romanusyk.ft.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by Roman Usyk on 16.09.17.
 */
public class EntityIdNotValidException extends ApplicationException {

    public EntityIdNotValidException(String message) {
        super(message, ErrorData.ENTITY_ID_NOT_VALID);
    }

    public EntityIdNotValidException(Class entityClass, Integer id) {
        super(
                String.format(
                        "No entity of type %s found by id %d",
                        entityClass.getSimpleName(), id
                ),
                ErrorData.ENTITY_ID_NOT_VALID
        );
    }

}
