package org.app.springnext.demo;

import org.eclipse.milo.opcua.sdk.client.OpcUaClient;
import org.eclipse.milo.opcua.stack.core.types.builtin.NodeId;
import org.eclipse.milo.opcua.stack.core.types.builtin.Variant;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

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
        try {
            Integer beerType = requestBody.get("beerType");
            OpcUaClient opcClient = OpcUaClientSingleton.getInstance();
            NodeId beerTypeNode = new NodeId(6, "::Program:Cube.Command.Parameter[1].Value");
            OpcUaUtility.writeValue(opcClient, beerTypeNode, new Variant((float) beerType));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/startMaintenance")
    public void startMaintenance() {
        try {
            CommandController machine = new CommandController();
            machine.startMaintenance();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void setAmount(Map<String, Integer> requestBody) {
    }

    @Override
    public void setSpeed(Map<String, Integer> requestBody) {

    }

    @Override
    public void startProduction() {

    }

    @Override
    public void cancelProduction() {

    }
}
