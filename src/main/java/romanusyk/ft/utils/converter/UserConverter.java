package romanusyk.ft.utils.converter;

import romanusyk.ft.data.entity.User;
import romanusyk.ft.data.model.dto.UserDTO;

/**
 * Created by Roman Usyk on 13.11.18.
 */
public class UserConverter {

    public static UserDTO to(User user) {
        if (user == null) {
            return null;
        }
        return UserDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .password(user.getPassword())
                .email(user.getEmail())
                .phone(user.getPhone())
                .creditCard(user.getCreditCard())
                .build();
    }

    public static User from(UserDTO userDTO) {
        if (userDTO == null) {
            return null;
        }
        return User.builder()
                .id(userDTO.getId())
                .username(userDTO.getUsername())
                .password(userDTO.getPassword())
                .email(userDTO.getEmail())
                .phone(userDTO.getPhone())
                .creditCard(userDTO.getCreditCard())
                .build();
    }

}
