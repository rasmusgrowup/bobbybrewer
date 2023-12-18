package org.app.persistence;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "status_codes")
public class StatusCodes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="description")
    private String descripiton;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescripiton() {
        return descripiton;
    }

    public void setDescripiton(String descripiton) {
        this.descripiton = descripiton;
    }
}
