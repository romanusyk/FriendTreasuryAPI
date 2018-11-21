package romanusyk.ft.exception;

import java.util.HashMap;

/**
 * Created by Roman Usyk on 12.09.17.
 */
public class EntityAlreadyExistsException extends ApplicationException {

    public EntityAlreadyExistsException(Class entityClass, String[] duplicatedFields) {
        super(
                String.format(
                        "%s already exists. Some fields are duplicated. See type details.",
                        entityClass.getSimpleName()
                ),
                ErrorData.ENTITY_ALREADY_EXISTS,
                new HashMap<String, Object>(){{
                    put("conflictFields", duplicatedFields);
                }}
        );
    }

}
