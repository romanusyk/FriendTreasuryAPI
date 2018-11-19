package romanusyk.ft.utils.logging;

import java.util.HashMap;
import java.util.Map;
import romanusyk.ft.data.model.dto.GroupDTO;

/**
 * Created by Roman Usyk on 19.11.18.
 */
public class ObjectRepresentation {

    public static String toString(GroupDTO groupDTO) {
        return new ObjectStringBuilder()
                .put("id", groupDTO.getId())
                .put("title", groupDTO.getTitle())
                .put("name", groupDTO.getName())
                .build();
    }

    private static class ObjectStringBuilder {

        private Map<String, String> map;

        public ObjectStringBuilder() {
            map = new HashMap<>();
        }

        public ObjectStringBuilder put(String name, Object value) {
            if (value != null) {
                map.put(name, value.toString());
            }
            return this;
        }

        public ObjectStringBuilder put(String name, Object value, boolean force) {
            if (value == null) {
                put(name, "null");
            }
            return this;
        }

        public String build() {
            return map.toString();
        }

    }

}
