package org.app.springnext.demo;

import org.eclipse.milo.opcua.sdk.client.OpcUaClient;


public class OpcUaClientSingleton {

    private static OpcUaClient instance;
    private static final String ENDPOINT_URL = "opc.tcp://127.0.0.1:4840";

    private OpcUaClientSingleton() {
    }

    public static synchronized OpcUaClient getInstance() throws Exception {
        if (instance == null) {
            instance = OpcUaClient.create(ENDPOINT_URL);
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
