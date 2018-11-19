package romanusyk.ft.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import romanusyk.ft.data.entity.User;
import romanusyk.ft.data.model.dto.UserDTO;
import romanusyk.ft.data.model.dto.UserStatistics;
import romanusyk.ft.exception.NotValidPasswordException;
import romanusyk.ft.exception.EntityNotFoundException;
import romanusyk.ft.security.JwtAccessToken;
import romanusyk.ft.security.JwtUtil;
import romanusyk.ft.service.interfaces.UserService;

import javax.validation.Valid;
import java.lang.invoke.MethodHandles;
import java.util.List;

/**
 * Created by Roman Usyk on 12.09.17.
 */
@CrossOrigin
@RestController
@RequiredArgsConstructor
@Api("User controller")
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    @ApiOperation(
            value = "get all users",
            notes = "get all all all users",
            produces = "Application/json"
    )
    @RequestMapping(value = "", method = RequestMethod.GET)
    @PreAuthorize("@securityService.hasRole('user')")
    @ResponseBody
    public List<UserDTO> getAllUsers(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization
    ) {
        return userService.getAllUsersDTO();
    }

    @RequestMapping(value = "/me", method = RequestMethod.GET)
    @PreAuthorize("@securityService.hasRole('user')")
    @ResponseBody
    public UserDTO getUserInfo(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization
    ) {
        UserDTO client = jwtUtil.getUserFromClaims(jwtUtil.getClamsFromToken(authorization));
        UserDTO user = userService.getUserDTOByID(client.getId());
        if (user == null) {
            User fakeUser = new User();
            fakeUser.setId(client.getId());
            throw new EntityNotFoundException(User.class, fakeUser);
        }
        return user;
    }

    @RequestMapping(value = "/statistics", method = RequestMethod.GET)
    @ResponseBody
    public UserStatistics getUserStatistics(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization
    ) {
        UserDTO client = jwtUtil.getUserFromClaims(jwtUtil.getClamsFromToken(authorization));
        return userService.getUserStatisticsByDTO(client);
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public JwtAccessToken addUser(@RequestBody @Valid UserDTO userDTO) {
        userDTO = userService.createUserFromDTO(userDTO);
        return jwtUtil.generateToken(userDTO);
    }

    @RequestMapping(value = "/access", method = RequestMethod.POST)
    @ResponseBody
    public JwtAccessToken validateUser(@RequestBody UserDTO userDTO) {
        logger.info("Validating user : " + userDTO);
        UserDTO validatedUser = userService.validateUser(userDTO);

        if (validatedUser == null) throw new NotValidPasswordException(userDTO);

        return jwtUtil.generateToken(validatedUser);
    }


    @RequestMapping(value = "", method = RequestMethod.PATCH)
    @PreAuthorize("@securityService.hasRole('user')")
    public void updateUser(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization,
            @RequestBody @Valid UserDTO userDTO
        ) {
        UserDTO client = jwtUtil.getUserFromClaims(jwtUtil.getClamsFromToken(authorization));
        userService.updateUser(userDTO, client);
    }

    @RequestMapping(value = "group/{groupname}", method = RequestMethod.PUT)
    @PreAuthorize("@securityService.hasRole('user')")
    public void joinGroup(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization,
            @PathVariable("groupname") String groupName) {

        UserDTO client = jwtUtil.getUserFromClaims(jwtUtil.getClamsFromToken(authorization));
        userService.addUserToGroup(client.getId(), groupName);
    }

    @RequestMapping(value = "group/{groupname}", method = RequestMethod.DELETE)
    @PreAuthorize("@securityService.hasRole('user')")
    public void leaveGroup(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization,
            @PathVariable("groupname") String groupName) {
        UserDTO client = jwtUtil.getUserFromClaims(jwtUtil.getClamsFromToken(authorization));
        userService.removeUserFromGroup(client.getId(), groupName);
    }

    @RequestMapping(value = "group/{group}", method = RequestMethod.GET)
    @ResponseBody
    @PreAuthorize("@securityService.hasRole('user')")
    public List<UserDTO> getUsersInGroup(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization,
            @PathVariable("group") Integer groupID) {
        UserDTO client = jwtUtil.getUserFromClaims(jwtUtil.getClamsFromToken(authorization));
        return userService.getUsersInGroup(groupID, client);
    }

    @PostMapping(value = "/check")
    @ResponseBody
    public void checkIfUserExists(@RequestBody @Valid UserDTO userDTO) {
        userService.checkIfUserNotExist(userDTO);
    }

    private static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());
}
