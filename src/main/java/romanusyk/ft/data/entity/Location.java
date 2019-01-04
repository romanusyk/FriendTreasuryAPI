package romanusyk.ft.data.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;

/**
 * Created by Roman Usyk on 22.11.18.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class Location {

    @Column
    private double longitude;

    @Column
    private double latitude;

    @Column
    private String locationName;

}
