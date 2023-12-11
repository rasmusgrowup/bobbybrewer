package org.app;

import org.app.api.SseController;
import org.app.service.SubscriptionManager;
import org.eclipse.milo.opcua.stack.core.types.builtin.NodeId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

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
			sm.run(new NodeId(6, "::Program:Cube.Status.StateCurrent"));
			//Products produced:
			sm.run(new NodeId(6, "::Program:Cube.Admin.ProdProcessedCount"));
			sm.run(new NodeId(6, "::Program:Cube.Admin.ProdDefectiveCount"));
			//Maintenance:
			sm.run(new NodeId(6, "::Program:Maintenance.Counter"));
			//Inventory:
			sm.run(new NodeId(6, "::Program:Inventory.Yeast"));
			sm.run(new NodeId(6, "::Program:Inventory.Wheat"));
			sm.run(new NodeId(6, "::Program:Inventory.Malt"));
			sm.run(new NodeId(6, "::Program:Inventory.Hops"));
			sm.run(new NodeId(6, "::Program:Inventory.Barley"));
			//Sensors:
			sm.run(new NodeId(6, "::Program:Cube.Status.Parameter[2].Value"));
			sm.run(new NodeId(6, "::Program:Cube.Status.Parameter[3].Value"));
			sm.run(new NodeId(6, "::Program:Cube.Status.Parameter[4].Value"));
			//Stop reason:
			sm.run(new NodeId(6, "::Program:Cube.Admin.StopReason.ID"));
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
