package romanusyk.ft.controller.handler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import romanusyk.ft.data.model.dto.ErrorResponseEntity;
import romanusyk.ft.exception.ApplicationException;
import romanusyk.ft.exception.ErrorData;
import romanusyk.ft.utils.converter.ErrorResponseEntityConverter;

import java.lang.invoke.MethodHandles;
import java.util.HashMap;

/**
 * Created by Roman Usyk on 15.11.18.
 */
@RestControllerAdvice
@RequiredArgsConstructor
public class CustomizedResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

    @ExceptionHandler(ApplicationException.class)
    public final ResponseEntity<ErrorResponseEntity> handleAllExceptions(ApplicationException ex) {

        ErrorData errorData = ex.getErrorData();
        ErrorResponseEntity errorResponseEntity = ErrorResponseEntityConverter.to(
                ex.getMessage(),
                errorData,
                ex.getDetails()
        );

        logger.error(errorData.getType(), ex);

        return new ResponseEntity<>(errorResponseEntity, errorData.getHttpStatus());

    }

    @ExceptionHandler({Exception.class})
    public final ResponseEntity<ErrorResponseEntity> handleAllExceptions(Exception ex) {

        ErrorData errorData = ErrorData.UNEXPECTED_ERROR;
        ErrorResponseEntity errorResponseEntity = ErrorResponseEntityConverter.to(
                ex.getMessage(),
                errorData,
                null
        );

        logger.error(errorData.getType(), ex);

        return new ResponseEntity<>(errorResponseEntity, errorData.getHttpStatus());

    }

}
