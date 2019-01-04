package romanusyk.ft.utils.converter;

import romanusyk.ft.data.entity.Event;
import romanusyk.ft.data.entity.Share;
import romanusyk.ft.data.entity.ShareKey;
import romanusyk.ft.data.entity.ShareType;
import romanusyk.ft.data.model.dto.ShareDTO;

/**
 * Created by Roman Usyk on 24.11.18.
 */
public class ShareConverter {

    public static ShareDTO to(Share share) {
        return ShareDTO.builder()
                .user(UserConverter.to(share.getKey().getUser()))
                .amount(share.getAmount())
                .build();
    }

    public static Share from(ShareDTO shareDTO, ShareType shareType, Event event) {
        return Share.builder()
                .key(new ShareKey(
                    UserConverter.from(shareDTO.getUser()),
                    event
                ))
                .amount(shareDTO.getAmount())
                .type(shareType)
                .build();
    }

}
