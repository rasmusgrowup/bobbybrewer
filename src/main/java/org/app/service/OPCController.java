package org.app.service;

import org.app.persistence.ProductionHistory;
import org.eclipse.milo.opcua.sdk.client.OpcUaClient;
import org.eclipse.milo.opcua.stack.core.types.builtin.NodeId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(path = "/api")
public class OPCController implements IOPCController {
    private final ProductionHistoryService productionHistoryService;

    @Autowired
    public OPCController(ProductionHistoryService productionHistoryService) {
        this.productionHistoryService = productionHistoryService;
    }

    @Override
    @GetMapping("/read-current-state")
    public Map<String, String> readState() {
        Map<String, String> responseData = new HashMap<>();
        try {
            OpcUaClient opcClient = OpcUaClientSingleton.getInstance();
            //Current state:
            NodeId stateCurrent = new NodeId(6, "::Program:Cube.Status.StateCurrent");
            responseData.put("stateCurrent", OpcUaUtility.readValue(opcClient, stateCurrent));
            //Product:
            NodeId totalProduced = new NodeId(6, "::Program:product.produced");
            NodeId goodProducts = new NodeId(6, "::Program:product.good");
            NodeId badProducts = new NodeId(6, "::Program:product.bad");
            responseData.put("totalProduced", OpcUaUtility.readValue(opcClient, totalProduced));
            responseData.put("goodProducts", OpcUaUtility.readValue(opcClient, goodProducts));
            responseData.put("badProducts", OpcUaUtility.readValue(opcClient, badProducts));
            //Maintenance:
            NodeId maintenanceCounter = new NodeId(6, "::Program:Maintenance.Counter");
            responseData.put("maintenanceCounter", OpcUaUtility.readValue(opcClient, maintenanceCounter));
            //Inventory:
            NodeId inventoryYeast = new NodeId(6, "::Program:Inventory.Yeast");
            NodeId inventoryWheat = new NodeId(6, "::Program:Inventory.Wheat");
            NodeId inventoryMalt = new NodeId(6, "::Program:Inventory.Malt");
            NodeId inventoryHops = new NodeId(6, "::Program:Inventory.Hops");
            NodeId inventoryBarley = new NodeId(6, "::Program:Inventory.Barley");
            responseData.put("inventoryYeast", OpcUaUtility.readValue(opcClient, inventoryYeast));
            responseData.put("inventoryWheat", OpcUaUtility.readValue(opcClient, inventoryWheat));
            responseData.put("inventoryMalt", OpcUaUtility.readValue(opcClient, inventoryMalt));
            responseData.put("inventoryHops", OpcUaUtility.readValue(opcClient, inventoryHops));
            responseData.put("inventoryBarley", OpcUaUtility.readValue(opcClient, inventoryBarley));
            //Sensors:
            NodeId humidity = new NodeId(6, "::Program:Cube.Status.Parameter[2].Value");
            NodeId temperature = new NodeId(6, "::Program:Cube.Status.Parameter[3].Value");
            NodeId vibration = new NodeId(6, "::Program:Cube.Status.Parameter[4].Value");
            responseData.put("humidity", OpcUaUtility.readValue(opcClient, humidity));
            responseData.put("temperature", OpcUaUtility.readValue(opcClient, temperature));
            responseData.put("vibration", OpcUaUtility.readValue(opcClient, vibration));

            return responseData;
        } catch (Exception e) {
            responseData.put("error", "Failed to read data.");
            return responseData;
        }
    }

    @Override
    @PostMapping("/set-beer-type")
    public void setBeerType(@RequestBody Map<String, Integer> requestBody) {
        CommandController commandController = new CommandController();
        commandController.setBeerType(requestBody);
    }

    @PostMapping("/startMaintenance")
    public void startMaintenance() {
        CommandController commandController = new CommandController();
        commandController.startMaintenance();
    }

    @Override
    public void setAmount(Map<String, Integer> requestBody) {
    }

    @Override
    public void setSpeed(Map<String, Integer> requestBody) {

    }

    @Override
    @PostMapping("/start_production")
    public void startProduction(@RequestBody Map<String, Integer> requestBody) throws Exception {
        boolean is_reset = false;
        boolean is_finished = false;
        CommandController commandController = new CommandController();
        commandController.resetCommand();
        ProductionHistory ph = new ProductionHistory();
        while (!is_reset) {
            is_reset = OpcUaUtility.readValue(OpcUaClientSingleton.getInstance(), new NodeId(6, "::Program:Cube.Status.StateCurrent")).equals("4");
        }
        commandController.setBeerType(requestBody);
        commandController.setAmount(requestBody);
        commandController.setSpeed(requestBody);
        commandController.startProduction();
        float beerType = requestBody.get("beerType");
        float amountCount = requestBody.get("amount");
        float machSpeed = requestBody.get("speed");
        ph.setBeerType(beerType);
        ph.setAmountCount(amountCount);
        ph.setMachSpeed(machSpeed);
        ph.setTimeStampStart(LocalDateTime.now());
        while (!is_finished) {
            is_finished = OpcUaUtility.readValue(OpcUaClientSingleton.getInstance(), new NodeId(6, "::Program:Cube.Status.StateCurrent")).equals("17");
        }
        int processedCount = Integer.parseInt(OpcUaUtility.readValue(OpcUaClientSingleton.getInstance(), new NodeId(6, "::Program:Cube.Admin.ProdProcessedCount")));
        int defectiveCount = Integer.parseInt(OpcUaUtility.readValue(OpcUaClientSingleton.getInstance(), new NodeId(6, "::Program:Cube.Admin.ProdDefectiveCount")));
        ph.setProcessedCount(processedCount);
        ph.setDefectiveCount(defectiveCount);
        ph.setTimeStampStop(LocalDateTime.now());
        productionHistoryService.saveProductionHistory(ph);

    }

    @Override
    @PostMapping("/stop_production")
    public void cancelProduction() {
        CommandController commandController = new CommandController();
        commandController.cancelProduction();
    }
}
