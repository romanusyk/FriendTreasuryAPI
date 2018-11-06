package romanusyk.ft.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import lombok.experimental.Accessors;
import org.hibernate.validator.constraints.NotEmpty;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.lang.invoke.MethodHandles;
import java.math.BigDecimal;
import java.util.Date;

/**
 * Created by romm on 06.02.17.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Accessors(chain = true)
public class PaymentDTO {

    private static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

    private Integer userFrom;

    @NotNull
    @NotEmpty
    private Integer[] usersTo;

    @NotNull
    private Integer group;

    @NotNull
    private BigDecimal amount;

    @Min(0)
    @Max(1)
    @Builder.Default
    private Integer shallIPayForMyself = 1;

    @NotNull
    @NotEmpty
    private String description;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MMM-dd")
    private Date date;

    private double longitude;
    private double latitude;

    public void setShallIPayForMyself(Integer shallIPayForMyself) {
        if (shallIPayForMyself == null) {
            this.shallIPayForMyself = 1;
        } else {
            this.shallIPayForMyself = shallIPayForMyself;
        }
    }

}
