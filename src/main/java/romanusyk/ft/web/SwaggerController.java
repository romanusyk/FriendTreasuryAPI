package romanusyk.ft.web;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Roman Usyk on 03.09.17.
 */
@RestController
@Api("Demo controller")
public class SwaggerController {

    @RequestMapping(value = "/hello", method = RequestMethod.GET)
    @ApiOperation(
            value = "Value",
            notes = "Notes"
    )
    public String hello() {
        return "Swagger is not working!";
    }
}
