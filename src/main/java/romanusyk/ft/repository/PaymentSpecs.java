package romanusyk.ft.repository;

import org.springframework.data.jpa.domain.Specification;
import static org.springframework.data.jpa.domain.Specifications.*;
import romanusyk.ft.domain.Payment;

/**
 * Created by Roman Usyk on 12.09.17.
 */
public class PaymentSpecs {

    public static Specification<Payment> whereUserFrom(Integer userFromID) {
        return (root, criteriaQuery, criteriaBuilder) -> userFromID == null || userFromID == 0 ?
                criteriaBuilder.conjunction() :
                criteriaBuilder.equal(root.get("userFrom").get("id"), userFromID);
    }

    public static Specification<Payment> whereUserTo(Integer userToID) {
        return (root, criteriaQuery, criteriaBuilder) -> userToID == null || userToID == 0 ?
                criteriaBuilder.conjunction() :
                criteriaBuilder.equal(root.get("userTo").get("id"), userToID);
    }

    public static Specification<Payment> whereGroup(Integer groupID) {
        return (root, criteriaQuery, criteriaBuilder) -> groupID == null || groupID == 0 ?
                criteriaBuilder.conjunction() :
                criteriaBuilder.equal(root.get("group").get("id"), groupID);
    }

    public static Specification<Payment> filterPayment(
            Integer userFromID, Integer userToID, Integer groupID) {
        return where(whereUserFrom(userFromID)).and(whereUserTo(userToID)).and(whereGroup(groupID));
    }

}
