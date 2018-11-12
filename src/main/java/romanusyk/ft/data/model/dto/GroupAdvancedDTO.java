package romanusyk.ft.data.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import romanusyk.ft.data.entity.User;

import java.math.BigDecimal;
import java.util.Set;

/**
 * Created by Roman Usyk on 10.03.18.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GroupAdvancedDTO {

    private Integer id;
    private String title;
    private String name;
    private Set<UserDTO> users;
    private Integer usersCount;
    private BigDecimal userDebt;

}
