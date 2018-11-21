package romanusyk.ft.utils;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Created by Roman Usyk on 19.11.18.
 */
public interface Mappable {

    Map<String, Object> toMap();

    default String[] checkObjectIsNotPresentInList(
            Mappable object,
            List<Mappable> list,
            String ... constrainedFields) {
        Map<String, Object> objectMap = object.toMap();
        List<Map<String, Object> > objectMapSet = list.stream().map(Mappable::toMap).collect(Collectors.toList());
        Set<String> conflictFields = new HashSet<>();
        for (Map<String, Object> element: objectMapSet) {
            for (String constrainedField: constrainedFields) {
                if (Objects.equals(objectMap.get(constrainedField), element.get(constrainedField))) {
                    conflictFields.add(constrainedField);
                }
            }
        }
        return conflictFields.toArray(new String[]{});
    }

}
