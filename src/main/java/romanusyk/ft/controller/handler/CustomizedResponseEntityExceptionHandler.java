package romanusyk.ft.controller.handler;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import romanusyk.ft.data.model.dto.ErrorResponseEntity;
import romanusyk.ft.exception.ApplicationException;
import romanusyk.ft.exception.ErrorData;
import romanusyk.ft.utils.converter.ErrorResponseEntityConverter;

import java.lang.invoke.MethodHandles;
import java.util.stream.Collectors;

/**
 * Created by Roman Usyk on 15.11.18.
 */
@RestControllerAdvice
@RequiredArgsConstructor
public class CustomizedResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

    @ExceptionHandler(ApplicationException.class)
    public final ResponseEntity<ErrorResponseEntity> handleApplicationExceptions(ApplicationException ex) {

        ErrorData errorData = ex.getErrorData();
        ErrorResponseEntity errorResponseEntity = ErrorResponseEntityConverter.to(
                ex.getMessage(),
                errorData,
                ex.getDetails()
        );

        logger.error(errorData.getType(), ex);

        return new ResponseEntity<>(errorResponseEntity, errorData.getHttpStatus());
    }

    @ExceptionHandler({DataIntegrityViolationException.class})
    public final ResponseEntity<ErrorResponseEntity> handleDatabaseExceptions(DataIntegrityViolationException ex) {

        String message = ex.getRootCause().getMessage();

        ErrorData errorData = ErrorData.WRONG_ENTITY_DATA;
                ErrorResponseEntity errorResponseEntity = ErrorResponseEntityConverter.to(
                        message,
                        errorData,
                        null
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

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex,
            HttpHeaders headers,
            HttpStatus status,
            WebRequest request) {
        ErrorData errorData = ErrorData.ENTITY_NOT_VALID;
        ErrorResponseEntity responseEntity = ErrorResponseEntityConverter.to(
                "Not valid entity passed to parameter " + ex.getParameter().getParameterIndex(),
                errorData,
                ex.getBindingResult().getAllErrors()
                        .stream()
                        .map(x -> (FieldError) x)
                        .collect(Collectors.toMap(
                                FieldError::getField,
                                FieldError::getDefaultMessage
                        ))
        );
        logger.error("" + errorData.getCode(), ex);
        return new ResponseEntity<>(responseEntity, errorData.getHttpStatus());
    }

}
