package romanusyk.ft.data.model.dto;

import lombok.*;

import java.math.BigDecimal;

/**
 * Created by romm on 01.02.17.
 */

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PaymentDTO {

    private Integer id;

    private UserDTO userFrom;

    private UserDTO userTo;

    private GroupDTO group;

    private BigDecimal amount;

    private String description;

    private Long timestamp;

    private double longitude;

    private double latitude;

}
