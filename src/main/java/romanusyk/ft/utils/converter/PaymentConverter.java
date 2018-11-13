package romanusyk.ft.utils.converter;

import romanusyk.ft.data.entity.Group;
import romanusyk.ft.data.entity.Payment;
import romanusyk.ft.data.entity.User;
import romanusyk.ft.data.model.dto.GroupDTO;
import romanusyk.ft.data.model.dto.PaymentCreationDTO;
import romanusyk.ft.data.model.dto.PaymentDTO;

/**
 * Created by Roman Usyk on 13.11.18.
 */
public class PaymentConverter {

    public static PaymentDTO to(Payment payment) {
        return PaymentDTO.builder()
                .userFrom(payment.getUserFrom())
                .userTo(payment.getUserTo())
                .group(GroupConverter.to(payment.getGroup()))
                .amount(payment.getAmount())
                .timestamp(payment.getTimestamp())
                .description(payment.getDescription())
                .longitude(payment.getLongitude())
                .latitude(payment.getLatitude())
                .build();
    }

    public static Payment from(PaymentDTO paymentDTO, User userFrom, User userTo, Group group) {
        return Payment.builder()
                .userFrom(userFrom)
                .userTo(userTo)
                .group(group)
                .amount(paymentDTO.getAmount())
                .description(paymentDTO.getDescription())
                .timestamp(paymentDTO.getTimestamp())
                .longitude(paymentDTO.getLongitude())
                .latitude(paymentDTO.getLatitude())
                .build();
    }

    public static PaymentCreationDTO toCreation(Payment payment) {
        return PaymentCreationDTO.builder()
                .userFrom(payment.getUserFrom().getId())
                .usersTo(new Integer[]{payment.getUserTo().getId()})
                .group(payment.getGroup().getId())
                .amount(payment.getAmount())
                .date(payment.getTimestamp())
                .description(payment.getDescription())
                .longitude(payment.getLongitude())
                .latitude(payment.getLatitude())
                .build();
    }

    public static Payment fromCreation(PaymentCreationDTO paymentDTO, User userFrom, User userTo, Group group) {
        return Payment.builder()
                .userFrom(userFrom)
                .userTo(userTo)
                .group(group)
                .amount(paymentDTO.getAmount())
                .description(paymentDTO.getDescription())
                .timestamp(paymentDTO.getDate())
                .longitude(paymentDTO.getLongitude())
                .latitude(paymentDTO.getLatitude())
                .build();
    }

}
