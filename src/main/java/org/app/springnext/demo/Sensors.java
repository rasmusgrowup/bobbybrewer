package org.app.springnext.demo;

import lombok.extern.java.Log;
import org.eclipse.milo.opcua.sdk.client.OpcUaClient;
import org.eclipse.milo.opcua.stack.core.types.builtin.DataValue;
import org.eclipse.milo.opcua.stack.core.types.builtin.NodeId;
import org.eclipse.milo.opcua.stack.core.types.enumerated.TimestampsToReturn;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.HashMap;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.ExecutionException;

import static org.app.springnext.demo.OpcUaUtility.readValue;

public class Sensors {

    public static void main(String[] args) throws Exception {
        Sensors tempSensor = new Sensors();
        tempSensor.readTemp();
    }

    public static String readTemp() throws Exception {
        OpcUaClient client = OpcUaClientSingleton.getInstance();
        NodeId tempNode = new NodeId(6, "::Program:Data.Value.Temperature");
       // while (true) {
            String temp = readValue(client, tempNode);
       //     Thread.sleep(1000);
        //}
       return temp;
    }
}
