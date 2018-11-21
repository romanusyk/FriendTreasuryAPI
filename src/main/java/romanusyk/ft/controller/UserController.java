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
    @GetMapping
    @PreAuthorize("@securityService.hasRole('user')")
    @ResponseBody
    public List<UserDTO> getAllUsers(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization
    ) {
        return userService.getAllUsersDTO();
    }

    @GetMapping(value = "/me")
    @PreAuthorize("@securityService.hasRole('user')")
    @ResponseBody
    public UserDTO getUserInfo(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization
    ) {
        UserDTO client = jwtUtil.getUserFromClaims(jwtUtil.getClamsFromToken(authorization));
        UserDTO user = userService.getUserDTOByID(client.getId());
        if (user == null) {
            throw new EntityNotFoundException(UserDTO.class, UserDTO.builder().id(client.getId()).build());
        }
        return user;
    }

    @GetMapping(value = "/statistics")
    @ResponseBody
    public UserStatistics getUserStatistics(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization
    ) {
        UserDTO client = jwtUtil.getUserFromClaims(jwtUtil.getClamsFromToken(authorization));
        return userService.getUserStatisticsByDTO(client);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public JwtAccessToken addUser(@RequestBody @Valid UserDTO userDTO) {
        userDTO = userService.createUserFromDTO(userDTO);
        return jwtUtil.generateToken(userDTO);
    }

    @PostMapping(value = "/access")
    @ResponseBody
    public JwtAccessToken validateUser(@RequestBody UserDTO userDTO) {
        logger.info("Validating user : " + userDTO);
        UserDTO validatedUser = userService.validateUser(userDTO);

        if (validatedUser == null) throw new NotValidPasswordException(userDTO);

        return jwtUtil.generateToken(validatedUser);
    }


    @PatchMapping
    @PreAuthorize("@securityService.hasRole('user')")
    public void updateUser(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization,
            @RequestBody @Valid UserDTO userDTO
        ) {
        UserDTO client = jwtUtil.getUserFromClaims(jwtUtil.getClamsFromToken(authorization));
        userService.updateUser(userDTO, client);
    }

    @PutMapping(value = "group/{groupname}")
    @PreAuthorize("@securityService.hasRole('user')")
    public void joinGroup(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization,
            @PathVariable("groupname") String groupName) {

        UserDTO client = jwtUtil.getUserFromClaims(jwtUtil.getClamsFromToken(authorization));
        userService.addUserToGroup(client.getId(), groupName);
    }

    @DeleteMapping(value = "group/{groupname}")
    @PreAuthorize("@securityService.hasRole('user')")
    public void leaveGroup(
            @ApiParam(name = "X-Auth-Token", value = "X-Auth-Token") @RequestHeader("${ft.token.header}") String authorization,
            @PathVariable("groupname") String groupName) {
        UserDTO client = jwtUtil.getUserFromClaims(jwtUtil.getClamsFromToken(authorization));
        userService.removeUserFromGroup(client.getId(), groupName);
    }

    @GetMapping(value = "group/{group}")
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
