package romanusyk.ft.data.model.dto;

import lombok.*;

import javax.validation.constraints.NotNull;

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

    private String name;

}
