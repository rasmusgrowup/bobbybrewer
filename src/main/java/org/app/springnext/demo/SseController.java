package org.app.springnext.demo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;

@Component
@RestController
@RequestMapping("/sse")
@CrossOrigin(origins = "http://localhost:3000")
public class SseController {

    private final Logger logger = LoggerFactory.getLogger(getClass());
    private final SseEmitter sseEmitter = new SseEmitter(0L);

    @GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter stream() throws IOException {
        // Set additional headers
        sseEmitter.send(SseEmitter.event().name("init").comment("Connection initialized"));
        return sseEmitter;
    }

    // Trigger this method to send events to the frontend

    public void sendSseEvent(String eventData) {
        try {
            sseEmitter.send(SseEmitter.event().data(eventData, MediaType.APPLICATION_JSON));
        } catch (IllegalStateException e) {
            // Handle the IllegalStateException, which indicates that the emitter is already complete
            logger.warn("SseEmitter is already complete. Ignoring event: {}", eventData);
        } catch (IOException e) {
            // Handle other IOException, if needed
            logger.error("Error sending SSE event", e);
            sseEmitter.completeWithError(e);
        }
    }
}
