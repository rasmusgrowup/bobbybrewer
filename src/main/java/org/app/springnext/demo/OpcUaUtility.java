package org.app.springnext.demo;

import org.eclipse.milo.opcua.sdk.client.OpcUaClient;
import org.eclipse.milo.opcua.stack.core.types.builtin.DataValue;
import org.eclipse.milo.opcua.stack.core.types.builtin.NodeId;
import org.eclipse.milo.opcua.stack.core.types.builtin.StatusCode;
import org.eclipse.milo.opcua.stack.core.types.builtin.Variant;
import org.eclipse.milo.opcua.stack.core.types.enumerated.TimestampsToReturn;

import java.util.concurrent.ExecutionException;

public class OpcUaUtility {

    public static void writeValue(OpcUaClient client, NodeId nodeId, Variant value)
            throws InterruptedException, ExecutionException {

        DataValue dataValue = new DataValue(value, StatusCode.GOOD, null, null);
        StatusCode statusCode = client.writeValue(nodeId, dataValue).get();

        //Status
        if (statusCode.isGood()) {
            System.out.println("Write successful!");
        } else {
            System.out.println("Write failed with status: " + statusCode);
        }
    }
    public static String readValue(OpcUaClient client, NodeId nodeId) throws InterruptedException, ExecutionException {
        DataValue value = client.readValue(
                0,                     // max age
                TimestampsToReturn.Both,
                nodeId).get();

        System.out.println("Read value: " + value.getValue());
        return null;
    }
}

