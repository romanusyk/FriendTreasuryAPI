package romanusyk.ft.utils.converter;

import java.util.Map;

import romanusyk.ft.data.model.dto.ErrorResponseEntity;
import romanusyk.ft.exception.ErrorData;

/**
 * Created by Roman Usyk on 15.11.18.
 */
public class ErrorResponseEntityConverter {

    public static ErrorResponseEntity to(String message, ErrorData errorData, Map<String, Object> errorDetails) {
        ErrorResponseEntity.ErrorResponseEntityBuilder builder = ErrorResponseEntity.builder()
                .code(errorData.getCode())
                .type(errorData.getType())
                .message(message);
        if (errorDetails != null) {
            builder = builder.details(errorDetails);
        }
        return builder.build();
    }

}
