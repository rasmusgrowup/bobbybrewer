package org.app.service;

import java.util.ArrayList;
import java.util.List;

public class Graph {
    public Graph() {
    }

    public List<Point> calculateExponentialValues(double start, double end, double step, double b, double a) {
        List<Point> points = new ArrayList<>();
        for (double x = start; x <= end; x += step) {
            double y = b * Math.pow(a, x);
            points.add(new Point(x, y));
        }
        return points;
    }
}

