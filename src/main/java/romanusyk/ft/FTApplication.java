package romanusyk.ft;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.scheduling.annotation.EnableScheduling;
import romanusyk.ft.service.implementations.FromCodeDBInit;

/**
 * Created by Roman Usyk on 03.09.17.
 */
@SpringBootApplication
@EnableScheduling
public class FTApplication {

    public static void main(String[] args) {
        ConfigurableApplicationContext context = SpringApplication.run(FTApplication.class, args);

        context.getBean(FromCodeDBInit.class).init();

    }

}
