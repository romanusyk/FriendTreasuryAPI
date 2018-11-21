package romanusyk.ft.data.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.hibernate.validator.constraints.Email;

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
public class UserDTO {

    private Integer id;

    @NotNull
    private String username;

    @Email
    private String email;

    @Size(min = 8, max = 12)
    private String phone;

    @NotNull
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @Size(min = 16, max = 16)
    private String creditCard;

}
