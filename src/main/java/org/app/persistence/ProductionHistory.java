package org.app.persistence;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class ProductionHistory {

    @Id  @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private float beerType;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public float getBeerType() {
        return beerType;
    }

    public void setBeerType(float beerType) {
        this.beerType = beerType;
    }

    public LocalDateTime getTimeStampStart() {
        return timeStampStart;
    }

    public void setTimeStampStart(LocalDateTime timeStampStart) {
        this.timeStampStart = timeStampStart;
    }

    public LocalDateTime getTimeStampStop() {
        return timeStampStop;
    }

    public void setTimeStampStop(LocalDateTime timeStampStop) {
        this.timeStampStop = timeStampStop;
    }

    public float getMachSpeed() {
        return machSpeed;
    }

    public void setMachSpeed(float machSpeed) {
        this.machSpeed = machSpeed;
    }

    public float getAmountCount() {
        return amountCount;
    }

    public void setAmountCount(float amountCount) {
        this.amountCount = amountCount;
    }

    public int getDefectiveCount() {
        return defectiveCount;
    }

    public void setDefectiveCount(int defectiveCount) {
        this.defectiveCount = defectiveCount;
    }

    public int getProcessedCount() {
        return processedCount;
    }

    public void setProcessedCount(int processedCount) {
        this.processedCount = processedCount;
    }

    private LocalDateTime timeStampStart;
    private LocalDateTime timeStampStop;
    private float machSpeed;
    private float amountCount;
    private int defectiveCount;
    private int processedCount;
}
