package org.app.service;

import com.sun.jdi.IntegerValue;
import org.eclipse.milo.opcua.sdk.client.OpcUaClient;
import org.eclipse.milo.opcua.stack.core.types.builtin.NodeId;
import org.eclipse.milo.opcua.stack.core.types.builtin.Variant;

import java.util.Map;

public class CommandController {
    private SseController sseController;

    public void startProduction() {
        try {
            OpcUaClient client = OpcUaClientSingleton.getInstance();

            NodeId nodeCntrlCmd = new NodeId(6, "::Program:Cube.Command.CntrlCmd");
            NodeId nodeCmdChangeRequest = new NodeId(6, "::Program:Cube.Command.CmdChangeRequest");

            OpcUaUtility.writeValue(client, nodeCntrlCmd, new Variant(2));
            OpcUaUtility.writeValue(client, nodeCmdChangeRequest, new Variant(true));

        } catch (Exception e) {
            System.out.println(e);
            e.printStackTrace();
        }
    }
    public void resetCommand() {
        try {
            OpcUaClient client = OpcUaClientSingleton.getInstance();

            NodeId nodeCntrlCmd = new NodeId(6, "::Program:Cube.Command.CntrlCmd");
            NodeId nodeCmdChangeRequest = new NodeId(6, "::Program:Cube.Command.CmdChangeRequest");

            OpcUaUtility.writeValue(client, nodeCntrlCmd, new Variant(1));
            OpcUaUtility.writeValue(client, nodeCmdChangeRequest, new Variant(true));

        } catch (Exception e) {
            System.out.println(e);
            e.printStackTrace();
        }
    }

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

            int[] cntrlCmds = {3, 1, 2, 4}; // 4: Abort (DI6), 2: Start (DI4), 3: Stop (DI5), 1: Reset (DI3). De fire cmds udfører maintenance
            long millisecondsDelay = 2000; // Pause mellem commands så maskinen kan nå at respondere

            for (int cntrlCmd : cntrlCmds) {
                OpcUaUtility.writeValue(client, nodeCntrlCmd, new Variant(cntrlCmd));
                OpcUaUtility.writeValue(client, nodeCmdChangeRequest, new Variant(true));
                Thread.sleep(millisecondsDelay); //Selve delay
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void startRefill(){
        try {

            OpcUaClient client = OpcUaClientSingleton.getInstance();
            SubscriptionManager sm = new SubscriptionManager(sseController);

            NodeId nodeCntrlCmd = new NodeId(6, "::Program:Cube.Command.CntrlCmd");
            NodeId nodeCmdChangeRequest = new NodeId(6, "::Program:Cube.Command.CmdChangeRequest");
            NodeId inventoryYeast = new NodeId(6, "::Program:Inventory.Yeast");
            NodeId inventoryWheat = new NodeId(6, "::Program:Inventory.Wheat");
            NodeId inventoryMalt = new NodeId(6, "::Program:Inventory.Malt");
            NodeId inventoryHops = new NodeId(6, "::Program:Inventory.Hops");
            NodeId inventoryBarley = new NodeId(6, "::Program:Inventory.Barley");

            OpcUaUtility.writeValue(client, nodeCntrlCmd,new Variant(0));
            OpcUaUtility.writeValue(client,nodeCmdChangeRequest,new Variant(1));
            while(Integer.valueOf(OpcUaUtility.readValue(client,inventoryYeast)) < 35000 ||
                    Integer.valueOf(OpcUaUtility.readValue(client,inventoryWheat)) < 35000 ||
                    Integer.valueOf(OpcUaUtility.readValue(client,inventoryMalt)) < 35000 ||
                    Integer.valueOf(OpcUaUtility.readValue(client,inventoryHops)) < 35000 ||
                    Integer.valueOf(OpcUaUtility.readValue(client,inventoryBarley)) < 35000) {
            }
            OpcUaUtility.writeValue(client, nodeCntrlCmd,new Variant(0));
            OpcUaUtility.writeValue(client,nodeCmdChangeRequest,new Variant(1));
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

    public void setAmount(Map<String, Integer> requestBody) {
        try {
            Integer beerType = requestBody.get("amount");
            OpcUaClient opcClient = OpcUaClientSingleton.getInstance();
            NodeId beerTypeNode = new NodeId(6, "::Program:Cube.Command.Parameter[2].Value");
            OpcUaUtility.writeValue(opcClient, beerTypeNode, new Variant((float) beerType));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    public void setSpeed(Map<String, Integer> requestBody) {
        try {
            Integer beerType = requestBody.get("speed");
            OpcUaClient opcClient = OpcUaClientSingleton.getInstance();
            NodeId beerTypeNode = new NodeId(6, "::Program:Cube.Command.MachSpeed");
            OpcUaUtility.writeValue(opcClient, beerTypeNode, new Variant((float) beerType));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    public void setBatchId(Map<String, Integer> requestBody) {
        try {
            Integer beerType = requestBody.get("batchid");
            OpcUaClient opcClient = OpcUaClientSingleton.getInstance();
            NodeId beerTypeNode = new NodeId(6, "::Program:Cube.Command.Parameter[1].Value");
            OpcUaUtility.writeValue(opcClient, beerTypeNode, new Variant((float) beerType));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}