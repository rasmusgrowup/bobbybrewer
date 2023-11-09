package org.app.springnext.demo;

import org.eclipse.milo.opcua.sdk.client.OpcUaClient;
import org.eclipse.milo.opcua.stack.core.types.builtin.NodeId;
import org.eclipse.milo.opcua.stack.core.types.builtin.Variant;

import java.util.Map;

public class CommandController {

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

    public void startMaintenance() {
        try {
            OpcUaClient client = OpcUaClientSingleton.getInstance();

            NodeId nodeCntrlCmd = new NodeId(6, "::Program:Cube.Command.CntrlCmd");
            NodeId nodeCmdChangeRequest = new NodeId(6, "::Program:Cube.Command.CmdChangeRequest");

            int[] cntrlCmds = {4, 2, 3, 1}; // 4: Abort (DI6), 2: Start (DI4), 3: Stop (DI5), 1: Reset (DI3). De fire cmds udfører maintenance
            long millisecondsDelay = 5000; // Pause mellem commands så maskinen kan nå at respondere

            for (int cntrlCmd : cntrlCmds) {
                OpcUaUtility.writeValue(client, nodeCntrlCmd, new Variant(cntrlCmd));
                OpcUaUtility.writeValue(client, nodeCmdChangeRequest, new Variant(true));
                Thread.sleep(millisecondsDelay); //Selve delay
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void setBeerType(Map<String, Integer> requestBody) {
        try {
            Integer beerType = requestBody.get("beerType");
            OpcUaClient opcClient = OpcUaClientSingleton.getInstance();
            NodeId beerTypeNode = new NodeId(6, "::Program:Cube.Command.Parameter[1].Value");
            OpcUaUtility.writeValue(opcClient, beerTypeNode, new Variant((float) beerType));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}