package romanusyk.ft.data.model.dto;

import lombok.*;

/**
 * Created by Roman Usyk on 29.11.18.
 */
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class LocationDTO {

    private double longitude;
    private double latitude;
    private String name;

}
