package org.app.persistence;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="productions")
public class Productions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="start_stamp")
    private LocalDateTime startStamp;
    @Column(name="stop_stamp")
    private LocalDateTime stopStamp;
    @Column(name="status_id")
    private int statusId;
    @Column(name="defective_count")
    private int defectiveCount;
    @Column(name="processed_count")
    private int processedCount;
    @Column(name="beer_type")
    private float beerType;
    @Column(name="amount_count")
    private float amountCount;
    @Column(name="mach_speed")
    private float machSpeed;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getStartStamp() {
        return startStamp;
    }

    public void setStartStamp(LocalDateTime startStamp) {
        this.startStamp = startStamp;
    }

    public LocalDateTime getStopStamp() {
        return stopStamp;
    }

    public void setStopStamp(LocalDateTime stopStamp) {
        this.stopStamp = stopStamp;
    }

    public float getStatusId() {
        return statusId;
    }

    public void setStatusId(int statusId) {
        this.statusId = statusId;
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

    public float getBeerType() {
        return beerType;
    }

    public void setBeerType(float beerType) {
        this.beerType = beerType;
    }

    public float getAmountCount() {
        return amountCount;
    }

    public void setAmountCount(float amountCount) {
        this.amountCount = amountCount;
    }

    public float getMachSpeed() {
        return machSpeed;
    }

    public void setMachSpeed(float machSpeed) {
        this.machSpeed = machSpeed;
    }
}
