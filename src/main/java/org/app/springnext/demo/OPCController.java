package org.app.springnext.demo;

import org.eclipse.milo.opcua.sdk.client.OpcUaClient;
import org.eclipse.milo.opcua.stack.core.types.builtin.NodeId;
import org.eclipse.milo.opcua.stack.core.types.builtin.Variant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping(path = "/api")
public class OPCController {

    @GetMapping("/read-data")
    public Map<String, String> readData() {
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

    @PostMapping("/write-data")
    public String writeData(@RequestBody String data) {
        try {
            OpcUaClient opcClient = OpcUaClientSingleton.getInstance();
            NodeId speed = new NodeId(6, "::Program:Cube.Command.MachSpeed");
            NodeId controlCmd = new NodeId(6, "::Program:Cube.Command.CntrlCmd");
            NodeId changeReq = new NodeId(6, "::Program:Cube.Command.CmdChangeRequest");
            NodeId batchId = new NodeId(6, "::Program:Cube.Command.Parameter[0].Value");
            NodeId beerType = new NodeId(6, "::Program:Cube.Command.Parameter[1].Value");
            NodeId amount = new NodeId(6, "::Program:Cube.Command.Parameter[2].Value");
            OpcUaUtility.writeValue(opcClient, speed, new Variant(100.0f));
            OpcUaUtility.writeValue(opcClient, batchId, new Variant(69.0f));
            OpcUaUtility.writeValue(opcClient, beerType, new Variant(1.0f));
            OpcUaUtility.writeValue(opcClient, amount, new Variant(1000.0f));
            //OpcUaUtility.writeValue(opcClient, controlCmd, new Variant(1));
            //OpcUaUtility.writeValue(opcClient, changeReq, new Variant(true));
            
            OpcUaUtility.writeValue(opcClient, controlCmd, new Variant(2));
            OpcUaUtility.writeValue(opcClient, changeReq, new Variant(true));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return "Data written to OPC device";
    }

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

    @GetMapping("/status")
    public String getStatus() {
        // Logic to get the status of the OPC device
        return "OPC device is online";
    }
}
