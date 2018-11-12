package romanusyk.ft.utils.converter;

import romanusyk.ft.data.model.dto.GroupDTO;
import romanusyk.ft.data.entity.Group;

/**
 * Created by Roman Usyk on 13.11.18.
 */
public class GroupConverter {

    public static GroupDTO to(Group group) {
        return GroupDTO.builder()
                .id(group.getId())
                .name(group.getName())
                .title(group.getTitle())
                .build();
    }

    public static Group from(GroupDTO dto) {
        return Group.builder()
                .id(dto.getId())
                .name(dto.getName())
                .title(dto.getTitle())
                .build();
    }

}
