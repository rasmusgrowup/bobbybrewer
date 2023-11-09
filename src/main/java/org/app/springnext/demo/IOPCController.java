package org.app.springnext.demo;

import org.springframework.web.bind.annotation.RequestBody;

import java.util.Map;

public interface IOPCController {

    Map<String, String> readState() throws Exception;
    void setBeerType(@RequestBody Map<String, Integer> requestBody);
    void setAmount(@RequestBody Map<String, Integer> requestBody);
    void setSpeed(@RequestBody Map<String, Integer> requestBody);
    void startProduction();
    void cancelProduction();
    void startMaintenance();
}
