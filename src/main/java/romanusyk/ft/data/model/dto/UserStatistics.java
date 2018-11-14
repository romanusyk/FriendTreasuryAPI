package romanusyk.ft.data.model.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import romanusyk.ft.data.entity.Group;
import romanusyk.ft.data.entity.User;

import java.math.BigDecimal;
import java.util.Set;

/**
 * Created by Roman Usyk on 19.01.18.
 */
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserStatistics {

    private String username;

    @JsonIgnore
    private User user;

    @JsonProperty("id")
    private Integer userId;

    private BigDecimal debt;

    private Integer groupCount;

    @JsonIgnore
    private Set<Group> groups;

    public static class UserStatisticsBuilder {

        public UserStatisticsBuilder groups(Set<Group> groups) {
            this.groups = groups;
            this.groupCount = groups.size();
            return this;
        }

        public UserStatisticsBuilder user(User user) {
            this.user = user;
            this.username = user.getUsername();
            this.userId = user.getId();
            this.groups(user.getGroups());
            return this;
        }

    }

}
