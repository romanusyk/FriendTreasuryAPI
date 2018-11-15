package romanusyk.ft.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

/**
 * Created by Roman Usyk on 15.11.18.
 */
@Getter
@AllArgsConstructor
public enum ErrorData {

    USER_AUTHENTICATION_ERROR(  100, HttpStatus.BAD_REQUEST,            "User authentication type."),
    PASSWORD_NOT_VALID(         110, HttpStatus.BAD_REQUEST,            "Password is not valid."),
    ENTITY_NOT_VALID(           200, HttpStatus.BAD_REQUEST,            "Entity is not valid."),
    ENTITY_ID_NOT_VALID(        210, HttpStatus.BAD_REQUEST,            "Entity id is not valid."),
    ENTITY_ALREADY_EXISTS(      220, HttpStatus.BAD_REQUEST,            "Entity already exists."),
    ENTITY_NOT_FOUND(           230, HttpStatus.NOT_FOUND,              "Entity is not found."),
    UNEXPECTED_ERROR(           500, HttpStatus.INTERNAL_SERVER_ERROR,  "Unexpected error.");

    private int code;
    private HttpStatus httpStatus;
    private String type;

}
