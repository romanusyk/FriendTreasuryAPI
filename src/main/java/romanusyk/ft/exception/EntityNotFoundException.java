package romanusyk.ft.exception;

import io.swagger.models.auth.In;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by Roman Usyk on 12.09.17.
 */
@ResponseStatus(HttpStatus.NOT_FOUND)
public class EntityNotFoundException extends RuntimeException {

    public EntityNotFoundException(Class entityClass, Object entity) {
        super(String.format(
                "Entity of type %s: %s was not found.",
                entityClass.getSimpleName(),
                entity.toString()
        ));
    }

    public EntityNotFoundException(String message) {
        super(message);
    }

}
