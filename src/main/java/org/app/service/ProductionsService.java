package org.app.service;

import org.app.persistence.*;
import org.eclipse.milo.opcua.stack.core.types.builtin.NodeId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProductionsService {

    private final ProductionsRepository productionRepository;
    private final SnapshotRepository snapshotRepository;
    private final StatusCodesRepository statusCodesRepository;

    @Autowired
    public ProductionsService(ProductionsRepository productionRepository, SnapshotRepository snapshotRepository, StatusCodesRepository statusCodesRepository) {
        this.productionRepository = productionRepository;
        this.snapshotRepository = snapshotRepository;
        this.statusCodesRepository = statusCodesRepository;
    }

    public void saveProductionHistory(Productions productionHistory) {
        productionRepository.save(productionHistory);
    }

    public List<Productions> getAllProductions() {
        return productionRepository.findAll();
    }

    public Productions getProductionHistoryById(Long id) {
        return productionRepository.findById(id).orElse(null);
    }

    public void deleteProductionHistory(Long id) {
        productionRepository.deleteById(id);
    }

    public void saveProductionData(float beerType, float amountCount, float machSpeed) {
        boolean is_finished = false;
        try {
            // Create a ProductionHistory object to store production data
            Productions productionHistory = new Productions();
            productionHistory.setBeerType(beerType);
            productionHistory.setAmountCount(amountCount);
            productionHistory.setMachSpeed(machSpeed);
            productionHistory.setStartStamp(LocalDateTime.now());
            int processedCount = 0;

            // Wait for production to finish
            while (!is_finished && amountCount != processedCount) {
                processedCount = Integer.parseInt(OpcUaUtility.readValue(OpcUaClientSingleton.getInstance(), new NodeId(6, "::Program:Cube.Admin.ProdProcessedCount")));
                is_finished = OpcUaUtility.readValue(OpcUaClientSingleton.getInstance(), new NodeId(6, "::Program:Cube.Status.StateCurrent")).equals("17");
            }

            // Retrieve and set additional production data
            processedCount = Integer.parseInt(OpcUaUtility.readValue(OpcUaClientSingleton.getInstance(), new NodeId(6, "::Program:Cube.Admin.ProdProcessedCount")));
            int defectiveCount = Integer.parseInt(OpcUaUtility.readValue(OpcUaClientSingleton.getInstance(), new NodeId(6, "::Program:Cube.Admin.ProdDefectiveCount")));
            productionHistory.setProcessedCount(processedCount);
            productionHistory.setDefectiveCount(defectiveCount);
            productionHistory.setStopStamp(LocalDateTime.now());
            productionHistory.setStatusId(getStatusCode()); // test

            // Save production data to the database
            saveProductionHistory(productionHistory);
        } catch (Exception e) {
            // Handle exceptions or log errors
            System.err.println("Error saving production data: " + e.getMessage());
        }
    }

    public int getStatusCode() throws Exception {
        int statusCode = -1;
        String currentState = OpcUaUtility.readValue(OpcUaClientSingleton.getInstance(), new NodeId(6, "::Program:Cube.Status.StateCurrent"));
        switch (currentState) {
            case "2":
                statusCode = 2;
                break;
            case "9":
                statusCode = 3;
                break;
            case "17":
                statusCode = 4;
                break;
            default:
                statusCode = 1;
        }
        return statusCode;
    };
}


