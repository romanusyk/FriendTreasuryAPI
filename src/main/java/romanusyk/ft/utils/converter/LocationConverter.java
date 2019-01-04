package romanusyk.ft.utils.converter;

import romanusyk.ft.data.entity.Location;
import romanusyk.ft.data.model.dto.LocationDTO;

/**
 * Created by Roman Usyk on 29.11.18.
 */
public class LocationConverter {

    public static LocationDTO to(Location location) {
        if (location == null) {
            return null;
        }
        return LocationDTO.builder()
                .latitude(location.getLatitude())
                .longitude(location.getLongitude())
                .name(location.getLocationName())
                .build();
    }

    public static Location from(LocationDTO locationDTO) {
        if (locationDTO == null) {
            return null;
        }
        return new Location(
                locationDTO.getLongitude(),
                locationDTO.getLatitude(),
                locationDTO.getName()
        );
    }
}
