package org.app.service;

import org.app.persistence.Productions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/productions")
public class ProductionsController {

    @Autowired
    private ProductionsService productionsService;

    @GetMapping("/all")
    public List<Productions> getAllProductions() {
        return productionsService.getAllProductions();
    }
}
