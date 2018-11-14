package romanusyk.ft.data.model.dto;

import lombok.*;
import romanusyk.ft.data.entity.Group;
import romanusyk.ft.data.entity.User;
import romanusyk.ft.data.model.value.DebtKey;

import javax.persistence.*;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.Date;

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
