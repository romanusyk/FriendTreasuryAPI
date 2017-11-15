package romanusyk.ft.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.Serializable;
import java.util.Arrays;

/**
 * Created by Roman Usyk on 12.09.17.
 */
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class EntityAlreadyExistsException extends RuntimeException {

    public EntityAlreadyExistsException(Class entityClass, String[] duplicatedFields) {
        super(
                String.format(
                        "%s already exists. Duplicated fields: %s",
                        entityClass.getSimpleName(),
                        Arrays.toString(duplicatedFields)
                )
        );
    }

}
