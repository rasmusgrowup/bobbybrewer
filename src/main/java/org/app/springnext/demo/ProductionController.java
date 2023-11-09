package org.app.springnext.demo;

import org.eclipse.milo.opcua.sdk.client.OpcUaClient;
import org.eclipse.milo.opcua.stack.core.UaException;
import org.eclipse.milo.opcua.stack.core.types.builtin.NodeId;
import org.eclipse.milo.opcua.stack.core.types.builtin.Variant;

import java.sql.SQLOutput;
import java.util.concurrent.ExecutionException;

public class ProductionController {
    static void startProduction()
            throws Exception {
        OpcUaClient client = OpcUaClientSingleton.getInstance();
        //if (sensorWarning || needMaintenance || emptyIngredients) {
            // disable start button
        //} else {
            // enable start button
            NodeId nodeId1 = new NodeId(6,"::Program:Cube.Command.PackMLCmd.CntrlCmd");
            NodeId nodeId2 = new NodeId(6,"::Program:Cube.Command.CmdChangeRequest");
            OpcUaUtility.writeValue(client, nodeId1, new Variant(2));
            OpcUaUtility.writeValue(client, nodeId2, new Variant(true));
        //}
    }
}
