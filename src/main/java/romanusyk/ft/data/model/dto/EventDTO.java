package romanusyk.ft.data.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import romanusyk.ft.data.entity.EventState;
import romanusyk.ft.data.entity.Share;

import java.util.List;
import java.util.Set;

/**
 * Created by Roman Usyk on 24.11.18.
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class EventDTO {

    private Long id;
    private GroupDTO group;
    private EventState state;
    private List<UserDTO> members;
    private List<EventDTO> children;
    private List<ShareDTO> debtors;
    private List<ShareDTO> depositors;
    private String description;
    private Long date;
    private LocationDTO location;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private UserDTO lastModifiedBy;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long lastModifiedAt;

}
