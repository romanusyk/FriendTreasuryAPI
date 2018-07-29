package romanusyk.ft.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by Roman Usyk on 16.09.17.
 */
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class EntityIdNotValidException extends RuntimeException {

    public EntityIdNotValidException(String message) {
        super(message);
    }

    public EntityIdNotValidException(Class entityClass, Integer id) {
        super(String.format("No entity of type %s found by id %d", entityClass.getSimpleName(), id));
    }
}
