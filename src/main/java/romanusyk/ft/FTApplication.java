package romanusyk.ft;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import romanusyk.ft.service.FromCodeDBInit;

/**
 * Created by Roman Usyk on 03.09.17.
 */
@SpringBootApplication
public class FTApplication {

    public static void main(String[] args) {
        ConfigurableApplicationContext context = SpringApplication.run(FTApplication.class, args);

        // This line need be removed
        context.getBean(FromCodeDBInit.class).init();
    }

}
