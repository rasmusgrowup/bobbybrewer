package org.app.springnext.demo;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    @MessageMapping("/send-message") // Defines the message mapping for incoming messages
    @SendTo("/topic/messages") // Sends the response to the specified topic
    public String sendMessage(String message) {
        // Process the received message, e.g., interact with Eclipse Milo
        return "Server says: " + message;
    }
}
