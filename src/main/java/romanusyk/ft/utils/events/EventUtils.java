package romanusyk.ft.utils.events;

import romanusyk.ft.data.entity.Event;

import java.util.Objects;
import java.util.function.Function;

/**
 * Created by Roman Usyk on 26.11.18.
 */
public class EventUtils {

    public enum FieldSelectionType {
        ALL,
        ANY,
        PARENT,
        EXCEPT_PARENT,
        LEAF,
        NOT_LEAF
    }

    @FunctionalInterface
    public interface Setter<T> {
        void f(Event event, T value);
    }

    public static void nullifyChildrenGroups(Event event) {
        if (event.getChildren() == null) {
            return;
        }
        for (Event child: event.getChildren()) {
            child.setGroup(null);
            nullifyChildrenGroups(child);
        }
    }

    public static <T> boolean checkFieldOnValue(
            Event event,
            Function<Event, T> getter,
            boolean notEquals,
            T value,
            FieldSelectionType selectionType) {
        if (selectionType == FieldSelectionType.ALL) {
            if (!Objects.equals(getter.apply(event), value) ^ notEquals) {
                return false;
            }
        } else if (selectionType == FieldSelectionType.ANY) {
            if (Objects.equals(getter.apply(event), value) ^ notEquals) {
                return true;
            }
        } else if (selectionType == FieldSelectionType.PARENT) {
            return Objects.equals(getter.apply(event), value) ^ notEquals;
        } else if (selectionType == FieldSelectionType.LEAF && isLeaf(event)) {
            return Objects.equals(getter.apply(event), value) ^ notEquals;
        } else if (selectionType == FieldSelectionType.NOT_LEAF && !isLeaf(event)) {
            if(!Objects.equals(getter.apply(event), value) ^ notEquals) {
                return false;
            }
        }
        if (event.getChildren() == null) {
            return true;
        }
        if (selectionType == FieldSelectionType.EXCEPT_PARENT) {
            selectionType = FieldSelectionType.ALL;
        }
        for (Event child : event.getChildren()) {
            if (!checkFieldOnValue(
                    child,
                    getter,
                    notEquals,
                    value,
                    selectionType
            )) {
                return false;
            }
        }
        return true;
    }

    private static boolean isLeaf(Event event) {
        return event.getChildren() == null || event.getChildren().isEmpty();
    }

    public static <T> void propagateValueDown(
            Event event,
            Function<Event, T> getter,
            Setter<T> setter
    ) {
        T value = getter.apply(event);
        if (event.getChildren() == null) {
            return;
        }
        for (Event child : event.getChildren()) {
            if (getter.apply(child) == null) {
                setter.f(child, value);
            }
            propagateValueDown(child, getter, setter);
        }
    }

}
