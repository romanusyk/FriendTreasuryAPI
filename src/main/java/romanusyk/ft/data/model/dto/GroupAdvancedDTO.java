package romanusyk.ft.data.model.dto;

import lombok.*;
import romanusyk.ft.data.entity.User;

import java.math.BigDecimal;
import java.util.Set;

/**
 * Created by Roman Usyk on 10.03.18.
 */
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class GroupAdvancedDTO {

    private Integer id;
    private String title;
    private String name;
    private Set<UserDTO> users;
    private Integer usersCount;
    private BigDecimal userDebt;

}
