package org.app.springnext.demo;

import org.springframework.web.bind.annotation.RequestBody;

import java.util.Map;

public interface IOPCController {

    Map<String, String> readState();
    void setBeerType(@RequestBody Map<String, Integer> requestBody);
    void setAmount(@RequestBody Map<String, Integer> requestBody);
    void setSpeed(@RequestBody Map<String, Integer> requestBody);
    void startProduction(@RequestBody Map<String, Integer> requestBody) throws Exception;
    void cancelProduction();
    void startMaintenance();
}
