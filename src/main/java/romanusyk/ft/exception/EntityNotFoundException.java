package romanusyk.ft.exception;

/**
 * Created by Roman Usyk on 12.09.17.
 */
public class EntityNotFoundException extends ApplicationException {

    public EntityNotFoundException(Class entityClass, Object entity) {
        super(
                String.format(
                    "Entity of type %s: %s was not found.",
                    entityClass.getSimpleName(),
                    entity.toString()
                ),
                ErrorData.ENTITY_NOT_FOUND
        );
    }

}
