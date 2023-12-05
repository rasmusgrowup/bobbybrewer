package org.app.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatusCodesRepository extends JpaRepository<ProductionHistory, Long> {}