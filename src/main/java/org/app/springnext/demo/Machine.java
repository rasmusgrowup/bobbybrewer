package org.app.springnext.demo;

import org.eclipse.milo.opcua.sdk.client.OpcUaClient;
import org.eclipse.milo.opcua.stack.core.UaException;
import org.eclipse.milo.opcua.stack.core.types.builtin.NodeId;
import org.eclipse.milo.opcua.stack.core.types.builtin.Variant;

import java.util.concurrent.ExecutionException;

import static org.app.springnext.demo.Write.writeValue;

public class Machine {


    public void cancelProduction() {
        try {
            OpcUaClient client = OpcUaClientSingleton.getInstance();

            NodeId nodeCntrlCmd = new NodeId(6, "::Program:Cube.Command.CntrlCmd");
            NodeId nodeCmdChangeRequest = new NodeId(6, "::Program:Cube.Command.CmdChangeRequest");

            OpcUaUtility.writeValue(client, nodeCntrlCmd, new Variant(3));
            OpcUaUtility.writeValue(client, nodeCmdChangeRequest, new Variant(true));

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}