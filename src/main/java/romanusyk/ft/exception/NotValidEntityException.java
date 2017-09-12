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
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class NotValidEntityException extends RuntimeException {

    public NotValidEntityException(String message) {
        super(message);
    }

    public NotValidEntityException(Class entityClass, String errors) {
        super(String.format("Errors while validating %s: %s", entityClass.getSimpleName(), errors));
    }

    public static String getStringErrors(BindingResult bindingResult) {
        Map<String, String> errors = new HashMap<>();
        for (ObjectError e : bindingResult.getAllErrors()) {
            errors.put(e.getObjectName(), e.toString());
        }
        return errors.toString();
    }
}
