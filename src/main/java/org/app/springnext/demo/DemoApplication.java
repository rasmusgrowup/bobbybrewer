package org.app.springnext.demo;

import org.eclipse.milo.opcua.stack.core.types.builtin.NodeId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import javax.annotation.PostConstruct;

@SpringBootApplication
public class DemoApplication {

	@Autowired
	private SseController sseController;

	@PostConstruct
	public void initialize() throws Exception {
		SubscriptionManager sm = new SubscriptionManager(sseController);
		try {
			//Current state:
			sm.run(OpcUaClientSingleton.getInstance(), new NodeId(6, "::Program:Cube.Status.StateCurrent"));
			//Products produced:
			sm.run(OpcUaClientSingleton.getInstance(), new NodeId(6, "::Program:Cube.Admin.ProdProcessedCount"));
			sm.run(OpcUaClientSingleton.getInstance(), new NodeId(6, "::Program:Cube.Admin.ProdDefectiveCount"));
			//Maintenance:
			sm.run(OpcUaClientSingleton.getInstance(), new NodeId(6, "::Program:Maintenance.Counter"));
			//Inventory:
			sm.run(OpcUaClientSingleton.getInstance(), new NodeId(6, "::Program:Inventory.Yeast"));
			sm.run(OpcUaClientSingleton.getInstance(), new NodeId(6, "::Program:Inventory.Wheat"));
			sm.run(OpcUaClientSingleton.getInstance(), new NodeId(6, "::Program:Inventory.Malt"));
			sm.run(OpcUaClientSingleton.getInstance(), new NodeId(6, "::Program:Inventory.Hops"));
			sm.run(OpcUaClientSingleton.getInstance(), new NodeId(6, "::Program:Inventory.Barley"));
			//Sensors:
			sm.run(OpcUaClientSingleton.getInstance(), new NodeId(6, "::Program:Status.Parameter[2].Value"));
			sm.run(OpcUaClientSingleton.getInstance(), new NodeId(6, "::Program:Status.Parameter[3].Value"));
			sm.run(OpcUaClientSingleton.getInstance(), new NodeId(6, "::Program:Status.Parameter[4].Value"));
			//Stop reason:
			sm.run(OpcUaClientSingleton.getInstance(), new NodeId(6, "::Program:Cube.Admin.StopReason.Id"));
		} catch (Exception e) {
			// Log the exception and handle it appropriately
			// Notify the frontend about the error
			e.printStackTrace();
			// For example, you might want to log the error and continue with other initialization steps
		}
	}

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

}
