package org.app.api;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

// FrontendController.java
@Controller
public class FrontendController {

    @Value("${frontend.url}")
    private String frontendUrl;

    @RequestMapping(value = "/**/{path:[^\\.]*}")
    public String forward() {
        return "forward:" + frontendUrl;
    }
}
