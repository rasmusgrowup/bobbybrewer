package org.app.api;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.app.service.Graph;
import org.app.service.Point;

import java.util.List;

@RestController
@RequestMapping("/api/graph")
public class GraphController {

    @GetMapping("/exponential")
    public ResponseEntity<?> getExponentialFunctionValues(@RequestParam double start, @RequestParam double end, @RequestParam double step, @RequestParam double b, @RequestParam double a) {
        Graph graph = new Graph();
        List<Point> points = graph.calculateExponentialValues(start, end, step, b, a);
        return ResponseEntity.ok(points);
    }
}
