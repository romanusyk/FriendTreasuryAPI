package romanusyk.ft.data.model.dto;

import lombok.*;

import java.math.BigDecimal;

/**
 * Created by Roman Usyk on 24.11.18.
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ShareDTO {

    private UserDTO user;
    private BigDecimal amount;

}
