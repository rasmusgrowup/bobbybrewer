package org.app.service;

import org.eclipse.milo.opcua.sdk.client.OpcUaClient;
import org.eclipse.milo.opcua.stack.core.types.builtin.*;
import org.eclipse.milo.opcua.stack.core.types.enumerated.TimestampsToReturn;
import java.util.concurrent.ExecutionException;

public class OpcUaUtility {

    public static String writeValue(OpcUaClient client, NodeId nodeId, Variant value)
            throws InterruptedException, ExecutionException {

        DataValue dataValue = new DataValue(value, StatusCode.GOOD, null, null);
        StatusCode statusCode = client.writeValue(nodeId, dataValue).get();

        //Status
        if (statusCode.isGood()) {
            return "Write successful!";
        } else {
            return "Write failed with status: " + statusCode;
        }
    }

    public static String readValue(OpcUaClient client, NodeId nodeId) throws ExecutionException, InterruptedException {
        DataValue value = client.readValue(
                0,
                TimestampsToReturn.Both,
                nodeId).get();

        return value.getValue().getValue().toString();
    }

}