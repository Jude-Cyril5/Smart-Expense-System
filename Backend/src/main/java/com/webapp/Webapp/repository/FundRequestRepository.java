package com.webapp.Webapp.repository;

import com.webapp.Webapp.entity.FundRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FundRequestRepository extends JpaRepository<FundRequest, Long> {

    List<FundRequest> findByEmployeeId(Long employeeId);
    List<FundRequest> findByStatus(String status);
}
