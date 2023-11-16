package org.app.springnext.demo;

import org.eclipse.milo.opcua.sdk.client.OpcUaClient;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.PostConstruct;
import java.util.concurrent.CompletableFuture;

@SpringBootApplication
public class DemoApplication {

	@PostConstruct
	public void initialize() throws Exception {
		SubscriptionManager sm = new SubscriptionManager();
		sm.run(OpcUaClientSingleton.getInstance()).join();
	}

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

}
