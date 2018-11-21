package romanusyk.ft.utils.db;

import org.springframework.data.jpa.domain.Specification;
import static org.springframework.data.jpa.domain.Specifications.*;

import romanusyk.ft.data.entity.Group;
import romanusyk.ft.data.entity.Payment;

import java.util.Set;

/**
 * Created by Roman Usyk on 12.09.17.
 */
public class PaymentSpecs {

    /**
     * Add filter by userFromId unless userFromId is not null or 0
     * @param userFromID
     * @return filter by field
     */
    public static Specification<Payment> whereUserFrom(Integer userFromID) {
        return (root, criteriaQuery, criteriaBuilder) -> userFromID == null || userFromID == 0 ?
                criteriaBuilder.conjunction() :
                criteriaBuilder.equal(root.get("userFrom").get("id"), userFromID);
    }

    /**
     * Add filter by userToID unless userToID is not null or 0
     * @param userToID
     * @return filter by field
     */
    public static Specification<Payment> whereUserTo(Integer userToID) {
        return (root, criteriaQuery, criteriaBuilder) -> userToID == null || userToID == 0 ?
                criteriaBuilder.conjunction() :
                criteriaBuilder.equal(root.get("userTo").get("id"), userToID);
    }

    /**
     * Add one of the following filter by groupID:
     *  - if groupID is null or 0, leave only userGroups groups
     *  - apply filter by groupID otherwise
     * @param groupID - exact id to filter. Can be 0 or null
     * @param userGroups - set of groups to pass in case groupId is null or 0
     * @return filter by field
     */
    public static Specification<Payment> whereGroup(Integer groupID, Set<Group> userGroups) {
        return (root, criteriaQuery, criteriaBuilder) -> groupID == null || groupID == 0 ?
                userGroups.isEmpty() ? criteriaBuilder.conjunction() : root.get("group").in(userGroups) :
                criteriaBuilder.equal(root.get("group").get("id"), groupID);
    }

    public static Specification<Payment> sortByTimestampDesc() {
        return (root, criteriaQuery, criteriaBuilder) -> {
            criteriaQuery.orderBy(
                    criteriaBuilder.desc(root.get("timestamp")),
                    criteriaBuilder.desc(root.get("id"))
            );
            return criteriaBuilder.conjunction();
        };
    }

    /**
     * Apply filter by provided fields
     * @param userFromID
     * @param userToID
     * @param groupID
     * @param userGroups
     * @return filter by fields
     */
    public static Specification<Payment> filterPayment(
            Integer userFromID, Integer userToID, Integer groupID, Set<Group> userGroups) {
        return where(whereUserFrom(userFromID))
                .and(whereUserTo(userToID))
                .and(whereGroup(groupID, userGroups))
                .and(sortByTimestampDesc());
    }

}
