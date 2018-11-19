package romanusyk.ft.utils.converter;

import romanusyk.ft.data.entity.Group;
import romanusyk.ft.data.model.dto.GroupAdvancedDTO;

import java.math.BigDecimal;
import java.util.stream.Collectors;

/**
 * Created by Roman Usyk on 13.11.18.
 */
public class GroupAdvancedConverter {

    public static GroupAdvancedDTO to(Group group) {
        return GroupAdvancedDTO.builder()
                .id(group.getId())
                .name(group.getName())
                .title(group.getTitle())
                .users(group.getUsers().stream().map(UserConverter::to).collect(Collectors.toSet()))
                .usersCount(group.getUsers().size())
                .build();
    }

    public static GroupAdvancedDTO to(Group group, BigDecimal userDebt) {
        GroupAdvancedDTO result = to(group);
        result.setUserDebt(userDebt);
        return result;
    }

}
