package org.app.persistence;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class ProductionHistory {

    @Setter  @Getter @Id  @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter  @Getter
    private float beerType;

    @Setter  @Getter
    private LocalDateTime timeStampStart;

    @Setter  @Getter
    private LocalDateTime timeStampStop;

    @Setter  @Getter
    private float machSpeed;

    @Setter  @Getter
    private float amountCount;

    @Setter  @Getter
    private int defectiveCount;

    @Setter  @Getter
    private int processedCount;
}
