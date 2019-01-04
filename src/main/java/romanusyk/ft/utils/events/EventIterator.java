package romanusyk.ft.utils.events;

import romanusyk.ft.data.entity.Event;

import java.util.Collection;
import java.util.List;
import java.util.function.Function;
import java.util.function.Supplier;

/**
 * Created by Roman Usyk on 24.11.18.
 */
public class EventIterator<T> {

    public void convolveElements(Event event, Function<Event, T> getter, Collection<T> result) {
        result.add(getter.apply(event));
        for (Event child: event.getChildren()) {
            convolveElements(child, getter, result);
        }
    }

    public void convolveElementLists(Event event, Function<Event, List<T> > getter, Collection<T> result) {
        result.addAll(getter.apply(event));
        for (Event child: event.getChildren()) {
            convolveElementLists(child, getter, result);
        }
    }

}
