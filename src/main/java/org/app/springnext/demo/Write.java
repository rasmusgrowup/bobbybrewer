package org.app.springnext.demo;
import org.eclipse.milo.opcua.sdk.client.OpcUaClient;
import org.eclipse.milo.opcua.stack.core.types.builtin.DataValue;
import org.eclipse.milo.opcua.stack.core.types.builtin.NodeId;
import org.eclipse.milo.opcua.stack.core.types.builtin.StatusCode;
import org.eclipse.milo.opcua.stack.core.types.builtin.Variant;

import java.util.concurrent.ExecutionException;

public class Write {

    public static void main(String[] args) throws Exception {
        // Your server endpoint.
        String endpointUrl = "opc.tcp://127.0.0.1:4840";

        // Create and connect the client.
        OpcUaClient client = OpcUaClient.create(endpointUrl);
        client.connect().get();

        try {
            // Your NodeId to write.
            NodeId nodeId = new NodeId(6, "::Program:Cube.Command.Parameter[1].Value");

            // Perform write.
            writeValue(client, nodeId, new Variant(0.0f));  // Writing an integer value.

        } finally {
            // Disconnect the client.
            client.disconnect().get();
        }
    }

    private static void writeValue(OpcUaClient client, NodeId nodeId, Variant value)
            throws InterruptedException, ExecutionException {

        // Create DataValue. A DataValue object wraps a Variant and allows you to specify StatusCode and timestamps.
        DataValue dataValue = new DataValue(value, StatusCode.GOOD, null, null);

        // Writing the value.
        StatusCode statusCode = client.writeValue(nodeId, dataValue).get();

        // Check write status.
        if (statusCode.isGood()) {
            System.out.println("Write successful!");
        } else {
            System.out.println("Write failed with status: " + statusCode);
        }
    }
}