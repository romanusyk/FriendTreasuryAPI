package romanusyk.ft.data.model.dto;

import lombok.*;
import romanusyk.ft.utils.logging.ObjectRepresentation;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * Created by Roman Usyk on 13.11.18.
 */
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class GroupDTO {

    private Integer id;

    @NotNull
    private String title;

    @Size(min = 21, max = 21)
    private String name;

    @Override
    public String toString() {
        return ObjectRepresentation.toString(this);
    }

}
