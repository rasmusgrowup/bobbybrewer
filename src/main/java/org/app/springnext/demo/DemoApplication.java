package org.app.springnext.demo;

import org.eclipse.milo.opcua.sdk.client.OpcUaClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import javax.annotation.PostConstruct;
import java.util.concurrent.CompletableFuture;

@SpringBootApplication
public class DemoApplication {

	@Autowired
	private SseController sseController;

	@PostConstruct
	public void initialize() throws Exception {
		SubscriptionManager sm = new SubscriptionManager(sseController);
		try {
			sm.run(OpcUaClientSingleton.getInstance());
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
