package org.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ProductionController {
    @Autowired
    private ProductionHistoryService phs;

    @PostMapping("/saveProductionData")
    public void saveProductionData(float beerType, float amountCount, float machSpeed) {
        phs.saveProductionData(beerType, amountCount, machSpeed);
    }
}
