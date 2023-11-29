package org.app.service;

import org.eclipse.milo.opcua.sdk.client.OpcUaClient;
import org.eclipse.milo.opcua.stack.core.types.builtin.DataValue;
import org.eclipse.milo.opcua.stack.core.types.builtin.NodeId;
import org.eclipse.milo.opcua.stack.core.types.enumerated.TimestampsToReturn;

import java.util.concurrent.ExecutionException;

public class Read {

    public static void main(String[] args) throws Exception {
        // Endpoint URL should be in the format "opc.tcp://[host]:[port][path]".
        String endpointUrl = "opc.tcp://127.0.0.1:4840";

        // Instantiate the client by passing endpointUrl.
        OpcUaClient client = OpcUaClient.create(endpointUrl);

        // Connect to the server.
        client.connect().get();

        try {
            // Read a value
            readValue(client, new NodeId(6, "::Program:Cube.Command.Parameter[1].Value"));
        } finally {
            // Make sure to disconnect the client from the server.
            client.disconnect().get();
        }
    }

    private static void readValue(OpcUaClient client, NodeId nodeId) throws InterruptedException, ExecutionException {
        DataValue value = client.readValue(
                0,                     // max age
                TimestampsToReturn.Both,
                nodeId).get();

        System.out.println("Read value: " + value.getValue());
    }
}