package romanusyk.ft.data.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

/**
 * Created by Roman Usyk on 13.11.18.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GroupDTO {

    private Integer id;

    @NotNull
    private String title;

    private String name;

}
