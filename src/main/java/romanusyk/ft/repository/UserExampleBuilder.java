package romanusyk.ft.repository;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import romanusyk.ft.domain.User;

/**
 * Created by Roman Usyk on 15.11.17.
 */
public class UserExampleBuilder {

    public Example<User> buildExistingUserExample(User user) {
        User exampleUser = new User();
        exampleUser.setUsername(user.getUsername());
        exampleUser.setEmail(user.getEmail());
        exampleUser.setPhone(user.getPhone());

        ExampleMatcher exampleMatcher = ExampleMatcher.matchingAny();

        return Example.of(exampleUser, exampleMatcher);
    }

}
