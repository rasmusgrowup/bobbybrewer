package org.app.service;

import org.app.persistence.ProductionHistory;
import org.app.persistence.ProductionHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductionHistoryService {

    private final ProductionHistoryRepository productionHistoryRepository;

    @Autowired
    public ProductionHistoryService(ProductionHistoryRepository productionHistoryRepository) {
        this.productionHistoryRepository = productionHistoryRepository;
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
}
