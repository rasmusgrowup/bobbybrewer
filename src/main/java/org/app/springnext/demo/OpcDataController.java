package org.app.springnext.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/opc")
public class OpcDataController {

    private final OpcDataService opcDataService;

    @Autowired
    public OpcDataController(OpcDataService opcDataService) {
        this.opcDataService = opcDataService;
    }

    @PostMapping("/update-data")
    public void updateOpcData(@RequestBody String data) {
        // Process the OPC data (you might receive this from Eclipse Milo)
        // Notify connected clients about the new data
        opcDataService.sendOpcData(data);
    }
}
