package org.app.springnext.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class OpcDataService {

    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public OpcDataService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void sendOpcData(String data) {
        messagingTemplate.convertAndSend("/topic/opc-data", data);
    }
}
