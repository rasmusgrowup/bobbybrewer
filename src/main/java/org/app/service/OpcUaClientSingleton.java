package org.app.service;

import org.eclipse.milo.opcua.sdk.client.OpcUaClient;
import org.eclipse.milo.opcua.sdk.client.api.config.OpcUaClientConfigBuilder;
import org.eclipse.milo.opcua.stack.client.DiscoveryClient;
import org.eclipse.milo.opcua.stack.core.types.structured.EndpointDescription;
import org.eclipse.milo.opcua.stack.core.util.EndpointUtil;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class OpcUaClientSingleton {

    private static OpcUaClient instance;
    private static final String ENDPOINT_URL = "opc.tcp://127.0.0.1:4840";
    private static final String MACHINE_ENDPOINT_URL = "opc.tcp://192.168.0.122:4840";
    private static final String TEST_ENDPOINT_URL = "opc.tcp://127.0.0.1:4334"; // node server endpoint for mac users

    OpcUaClientSingleton() {
    }

    public static synchronized OpcUaClient getInstance() throws Exception {
        String robotIP = System.getenv("ROBOT");
        if (instance == null) {
            List<EndpointDescription> endpoints = DiscoveryClient.getEndpoints("opc.tcp://127.0.0.1:4840").get();
            EndpointDescription configPoint = EndpointUtil.updateUrl(endpoints.get(0), "127.0.0.1", 4840);

            OpcUaClientConfigBuilder cfg = new OpcUaClientConfigBuilder();
            cfg.setEndpoint(configPoint);

            instance = OpcUaClient.create(cfg.build());
            instance.connect().get();
        }
        return instance;
    }

    public static void connect() throws Exception {
        getInstance();
    }

    public static void disconnect() throws Exception {
        if (instance != null) {
            instance.disconnect().get();
            instance = null;
        }
    }
}
