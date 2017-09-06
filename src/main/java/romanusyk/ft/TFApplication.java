package romanusyk.ft;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.context.annotation.ImportResource;

/**
 * Created by Roman Usyk on 03.09.17.
 */
@SpringBootApplication
public class TFApplication {

    public static void main(String[] args) {
        SpringApplication.run(TFApplication.class, args);
    }

}
