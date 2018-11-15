package romanusyk.ft.exception;

import java.util.Map;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApplicationException extends RuntimeException {

    protected ErrorData errorData;
    protected Map<String, Object> details;

    public ApplicationException(String message, ErrorData errorData) {
        super(message);
        this.errorData = errorData;
    }

    public ApplicationException(String message, ErrorData errorData, Map<String, Object> details) {
        super(message);
        this.errorData = errorData;
        this.details = details;
    }

}
