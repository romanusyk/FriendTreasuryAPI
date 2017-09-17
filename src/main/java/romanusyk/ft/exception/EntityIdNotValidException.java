package romanusyk.ft.exception;

/**
 * Created by Roman Usyk on 16.09.17.
 */
public class EntityIdNotValidException extends RuntimeException {

    public EntityIdNotValidException(String message) {
        super(message);
    }

    public EntityIdNotValidException(Class entityClass, Integer id) {
        super(String.format("No entity of type %s found by id %d", entityClass.getSimpleName(), id));
    }
}
