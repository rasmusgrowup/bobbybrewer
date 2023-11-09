package org.app.springnext.demo;

import org.eclipse.milo.opcua.sdk.client.OpcUaClient;
import org.eclipse.milo.opcua.stack.core.types.builtin.DataValue;
import org.eclipse.milo.opcua.stack.core.types.builtin.NodeId;
import org.eclipse.milo.opcua.stack.core.types.enumerated.TimestampsToReturn;

import java.util.concurrent.ExecutionException;

import static org.app.springnext.demo.OpcUaUtility.readValue;

public class Sensors {

    public static void main(String[] args) throws Exception {
        Sensors tempSensor = new Sensors();
        tempSensor.readTemp();
    }
    public String readTemp() throws Exception {
        OpcUaClient client = OpcUaClientSingleton.getInstance();
        NodeId tempNode = new NodeId(6, "::Program:Data.Value.Temperature");
        while (true) {
            readValue(client, tempNode);
            Thread.sleep(1000);
        }
    }
}
