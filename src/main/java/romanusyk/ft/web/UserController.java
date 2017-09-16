package romanusyk.ft.web;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import romanusyk.ft.domain.User;
import romanusyk.ft.exception.EntityAlreadyExistsException;
import romanusyk.ft.exception.NotValidEntityException;
import romanusyk.ft.exception.NotValidPasswordException;
import romanusyk.ft.exception.EntityNotFoundException;
import romanusyk.ft.security.JwtAccessToken;
import romanusyk.ft.security.JwtUtil;
import romanusyk.ft.service.UserService;

import javax.validation.Valid;
import java.lang.invoke.MethodHandles;
import java.util.List;

/**
 * Created by Roman Usyk on 12.09.17.
 */
@CrossOrigin
@RestController
@Api("User controller")
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;

    @ApiOperation(
            value = "get all users",
            notes = "get all all all users",
            produces = "Application/json"
    )
    @RequestMapping(value = "", method = RequestMethod.GET)
    @ResponseBody
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ResponseBody
    public User getUserById(@PathVariable("id") Integer id) {
        User user = userService.getUserByID(id);
        logger.debug(String.format("getUserById(%d) -> %s", id, user));
        if (user == null) {
            User fakeUser = new User();
            fakeUser.setId(id);
            throw new EntityNotFoundException(User.class, fakeUser);
        }
        return user;
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public JwtAccessToken addUser(@RequestBody @Valid User user, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            throw new NotValidEntityException(User.class,
                    NotValidEntityException.getStringErrors(bindingResult));
        }

        User existingUser = userService.getUserByUsername(user.getUsername());
        if (existingUser != null) throw new EntityAlreadyExistsException(User.class, existingUser);

        logger.info("Persisting user : " + user);
        userService.createUser(user);

        return JwtUtil.getInstance().getToken(user);
    }

    @RequestMapping(value = "", method = RequestMethod.PATCH)
    @ResponseBody
    public JwtAccessToken validateUser(@RequestBody User user) {

        logger.info("Validating user : " + user);
        User validatedUser = userService.validateUser(user);

        if (validatedUser == null) throw new NotValidPasswordException(user);

        return JwtUtil.getInstance().getToken(validatedUser);
    }

    public void updateUser(@RequestHeader("Authorization") String authorization, User user) {return;}

    public void joinGroup(@RequestHeader("Authorization") String authorization, Integer groupID) { return; }

    public void leaveGroup(@RequestHeader("Authorization") String authorization, Integer groupID) { return; }

    private static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());
}
