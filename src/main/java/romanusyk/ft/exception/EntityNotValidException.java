package romanusyk.ft.exception;

import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by Roman Usyk on 12.09.17.
 */
public class EntityNotValidException extends ApplicationException {

    public EntityNotValidException(String message) {
        super(message, ErrorData.ENTITY_NOT_VALID);
    }

}
