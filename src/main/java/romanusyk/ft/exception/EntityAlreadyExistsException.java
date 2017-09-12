package romanusyk.ft.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.Serializable;

/**
 * Created by Roman Usyk on 12.09.17.
 */
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class EntityAlreadyExistsException extends RuntimeException {

    public EntityAlreadyExistsException(Class entityClass, Object entity) {
        super(
                String.format(
                        "Entity of type %s %s already exists.",
                        entity.toString(),
                        entityClass.getSimpleName()
                )
        );
    }
}
