package romanusyk.ft.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.apache.log4j.Logger;

import java.math.BigDecimal;
import java.util.Date;

/**
 * Created by romm on 06.02.17.
 */
public class PaymentDTO {

    private static final Logger logger = Logger.getLogger(PaymentDTO.class);

    private Integer userFrom;
    private Integer[] usersTo;
    private BigDecimal amount;
    private Integer shallIPayForMyself;
    private String description;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MMM-dd")
    private Date date;

    private double longitude;
    private double latitude;

    public PaymentDTO() {

    }

    public PaymentDTO(Integer userFrom, Integer[] usersTo, BigDecimal amount, String description,
                      Date date, double longitude, double latitude) {
        this.userFrom = userFrom;
        this.usersTo = usersTo;
        this.amount = amount;
        this.description = description;
        this.date = date;
        this.shallIPayForMyself = 1;
        this.longitude = longitude;
        this.latitude = latitude;
    }

    public PaymentDTO(Integer userFrom, Integer[] usersTo, BigDecimal amount, String description,
                      Date date, double longitude, double latitude, Integer shallIPayForMyself) {
        this.userFrom = userFrom;
        this.usersTo = usersTo;
        this.amount = amount;
        this.shallIPayForMyself = shallIPayForMyself;
        this.description = description;
        this.date = date;
        this.longitude = longitude;
        this.latitude = latitude;
    }

    public void validate() {
        setShallIPayForMyself(getShallIPayForMyself());
    }

    public Integer getUserFrom() {
        return userFrom;
    }

    public void setUserFrom(Integer userFrom) {
        this.userFrom = userFrom;
    }

    public Integer[] getUsersTo() {
        return usersTo;
    }

    public void setUsersTo(Integer[] usersTo) {
        this.usersTo = usersTo;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Integer getShallIPayForMyself() {
        return shallIPayForMyself;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public void setShallIPayForMyself(Integer shallIPayForMyself) {
        if (shallIPayForMyself == 0 || shallIPayForMyself == 1) {
            this.shallIPayForMyself = shallIPayForMyself;
        } else {
            this.shallIPayForMyself = 1;
            logger.error("Trying to set " + shallIPayForMyself + " to 'setShallIPayForMyself' field. Setting default value : " + this.shallIPayForMyself + ".");
        }
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }
}
