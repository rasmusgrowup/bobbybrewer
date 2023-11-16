package org.app.springnext.demo;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;

@RestController
@RequestMapping("/sse")
public class SseController {

    private final SseEmitter sseEmitter = new SseEmitter();

    @GetMapping(path = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter stream() {
        return sseEmitter;
    }

    // Trigger this method to send events to the frontend
    public void sendSseEvent(String eventData) {
        try {
            sseEmitter.send(SseEmitter.event().data(eventData));
        } catch (IOException e) {
            e.printStackTrace();
            sseEmitter.completeWithError(e);
        }
    }
}
