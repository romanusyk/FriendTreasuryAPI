package romanusyk.ft.utils.converter;

import romanusyk.ft.data.entity.Group;
import romanusyk.ft.data.entity.User;
import romanusyk.ft.data.model.dto.DebtDTO;
import romanusyk.ft.data.model.value.Debt;

/**
 * Created by Roman Usyk on 15.11.18.
 */
public class DebtConverter {

    public static DebtDTO to(Debt debt) {
        return DebtDTO.builder()
                .userFrom(UserConverter.to(debt.getKey().getUserFrom()))
                .userTo(UserConverter.to(debt.getKey().getUserTo()))
                .group(GroupConverter.to(debt.getKey().getGroup()))
                .amount(debt.getAmount())
                .timestamp(debt.getTimestamp())
                .build();
    }

    public static Debt from(DebtDTO debtDTO, User userFrom, User userTo, Group group) {
        return Debt.builder()
                .key(userFrom, userTo, group)
                .amount(debtDTO.getAmount())
                .timestamp(debtDTO.getTimestamp())
                .build();
    }

}
