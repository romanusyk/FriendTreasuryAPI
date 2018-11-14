package romanusyk.ft.data.model.dto;

import lombok.*;

import java.math.BigDecimal;

/**
 * Created by Roman Usyk on 15.11.18.
 */
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class DebtDTO {

    private UserDTO userFrom;
    private UserDTO userTo;
    private GroupDTO group;
    private BigDecimal amount;
    private Long timestamp;

}
