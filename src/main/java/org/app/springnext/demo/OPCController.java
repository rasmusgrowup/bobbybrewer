package org.app.springnext.demo;

import org.eclipse.milo.opcua.sdk.client.OpcUaClient;
import org.eclipse.milo.opcua.stack.core.types.builtin.NodeId;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping(path = "/api")
public class OPCController implements IOPCController {

    @Override
    @GetMapping("/read-current-state")
    public Map<String, String> readState() {
        Map<String, String> responseData = new HashMap<>();
        try {
            OpcUaClient opcClient = OpcUaClientSingleton.getInstance();
            NodeId readStatus = new NodeId(6, "::Program:Cube.Status.StateCurrent");
            responseData.put("data", OpcUaUtility.readValue(opcClient, readStatus));
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
        CommandController commandController = new CommandController();
        commandController.resetCommand();
        while (!OpcUaUtility.readValue(OpcUaClientSingleton.getInstance(), new NodeId(6, "::Program:Cube.Status.StateCurrent")).equals("4")){
            System.out.println("Not reset yet, joo");
        }
        //TimeUnit.SECONDS.sleep(3);
        commandController.setBeerType(requestBody);
        commandController.setAmount(requestBody);
        commandController.setSpeed(requestBody);
        commandController.startProduction();
    }

    @Override
    public void cancelProduction() {

    }
}
