package org.app.service;

import org.app.persistence.*;
import org.eclipse.milo.opcua.sdk.client.api.subscriptions.UaMonitoredItem;
import org.eclipse.milo.opcua.stack.core.types.builtin.DataValue;
import org.eclipse.milo.opcua.stack.core.types.builtin.NodeId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProductionHistoryService {

    private final ProductionsRepository productionHistoryRepository;
    private final BatchRepository batchRepository;
    private final SnapshotRepository snapshotRepository;
    private final StatusCodesRepository statusCodesRepository;

    @Autowired
    public ProductionHistoryService(ProductionsRepository productionHistoryRepository, BatchRepository batchRepository, SnapshotRepository snapshotRepository, StatusCodesRepository statusCodesRepository) {
        this.productionHistoryRepository = productionHistoryRepository;
        this.batchRepository = batchRepository;
        this.snapshotRepository = snapshotRepository;
        this.statusCodesRepository = statusCodesRepository;
    }

    public ProductionHistory saveProductionHistory(ProductionHistory productionHistory) {
        return productionHistoryRepository.save(productionHistory);
    }

    public List<ProductionHistory> getAllProductionHistories() {
        return productionHistoryRepository.findAll();
    }

    public ProductionHistory getProductionHistoryById(Long id) {
        return productionHistoryRepository.findById(id).orElse(null);
    }

    public void deleteProductionHistory(Long id) {
        productionHistoryRepository.deleteById(id);
    }

    public void saveProductionData(float beerType, float amountCount, float machSpeed) {
        boolean is_finished = false;
        try {
            // Create a ProductionHistory object to store production data
            ProductionHistory productionHistory = new ProductionHistory();
            productionHistory.setBeerType(beerType);
            productionHistory.setAmountCount(amountCount);
            productionHistory.setMachSpeed(machSpeed);
            productionHistory.setTimeStampStart(LocalDateTime.now());
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
            productionHistory.setTimeStampStop(LocalDateTime.now());

            // Save production data to the database
            saveProductionHistory(productionHistory);
        } catch (Exception e) {
            // Handle exceptions or log errors
            System.err.println("Error saving production data: " + e.getMessage());
        }
    }

}


