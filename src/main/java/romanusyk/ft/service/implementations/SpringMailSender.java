package romanusyk.ft.service.implementations;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import romanusyk.ft.data.model.value.Debt;
import romanusyk.ft.data.entity.Group;
import romanusyk.ft.data.entity.User;
import romanusyk.ft.service.interfaces.MailSender;

import java.util.*;
import javax.mail.*;
import javax.mail.internet.*;

/**
 * Created by Roman Usyk on 06.11.18.
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class SpringMailSender implements MailSender {

    private final SpringUserService userService;
    private final SpringPaymentService paymentService;

    @Value("${mail.username}")
    public String mailUsername;

    @Value("${mail.password}")
    public String mailPassword;

    private static String SUBJECT = "Lannisters always pay their debts";

    @Scheduled(cron = "${mail.cron}")
    public void sendEmails() {
        List<User> allUsers = userService.getAllUsers();
        for (User user: allUsers) {
            Map<Group, List<Debt> > result = paymentService.getPaymentSum(null, null, user);
            Group key = Group.builder().id(0).build();
            List<Debt> debts = result.get(key);
            List<String> goodDebts = new LinkedList<>();
            List<String> badDebts = new LinkedList<>();
            for (Debt debt: debts) {
                if (Objects.equals(debt.getUserFrom().getId(), user.getId())) {
                    goodDebts.add(debt.getUserTo().getUsername() + ": " + debt.getAmount() + " hryvnas");
                } else if (Objects.equals(debt.getUserTo().getId(), user.getId())) {
                    badDebts.add(debt.getUserFrom().getUsername() + ": " + debt.getAmount() + " hryvnas");
                }
            }
            if (goodDebts.size() == 0 && badDebts.size() == 0){
                continue;
            }
            String message = "Hi, " +
                    user.getUsername() +
                    "!\n" +
                    "You're must be fucking happy to receive this kindly reminder from Friend Treasury!\n\n";
            if (goodDebts.size() > 0) {
                message += "We are glad to let you know that these fucking assholes own you some money and you " +
                        "should go and beat shit out them:\n\n" +
                        String.join("\n", goodDebts) + "\n\n";
            }
            if (badDebts.size() > 0) {
                message += "We are hurry to warn you that these bastards are expecting some money from you " +
                        "and you should be aware of them:\n\n" +
                        String.join("\n", badDebts) + "\n\n";
            }
            message += "If you want to unsubscribe from this mailing, you can donate us to make us able " +
                    "to hire first payed developer!\n" +
                    "Also we don't thank you for being with us so long because you cannot leave us " +
                    "and we will keep your personal data and send emails forever :)\n\n" +
                    "With delicious love, your Friend Treasury!";
            String[] senders = new String[]{user.getEmail()};
            SpringMailSender.sendFromGMail(
                    this.mailUsername,
                    this.mailPassword,
                    senders,
                    SpringMailSender.SUBJECT,
                    message
            );
        }
    }

    private static void sendFromGMail(String from, String pass, String[] to, String subject, String body) {
        Properties props = System.getProperties();
        String host = "smtp.gmail.com";
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.user", from);
        props.put("mail.smtp.password", pass);
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.auth", "true");

        Session session = Session.getDefaultInstance(props);
        MimeMessage message = new MimeMessage(session);

        try {
            message.setFrom(new InternetAddress(from));
            InternetAddress[] toAddress = new InternetAddress[to.length];

            // To get the array of addresses
            for (int i = 0; i < to.length; i++ ) {
                toAddress[i] = new InternetAddress(to[i]);
            }

            for (InternetAddress toAddres : toAddress) {
                message.addRecipient(Message.RecipientType.TO, toAddres);
            }

            message.setSubject(subject);
            message.setText(body);
            Transport transport = session.getTransport("smtp");
            transport.connect(host, from, pass);
            transport.sendMessage(message, message.getAllRecipients());
            transport.close();
        } catch (MessagingException me) {
            log.error("", me);
        }
        log.debug(String.format("Message to %s was successfully sent.", to[0]));
    }

}
