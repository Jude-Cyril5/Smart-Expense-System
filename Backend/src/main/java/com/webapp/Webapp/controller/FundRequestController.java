package com.webapp.Webapp.controller;

import com.webapp.Webapp.entity.FundRequest;
import com.webapp.Webapp.repository.FundRequestRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fund-request")

public class FundRequestController {

    private final FundRequestRepository repo;

    public FundRequestController(FundRequestRepository repo) {
        this.repo = repo;
    }

    // EMPLOYEE: submit request
    @PostMapping("/submit")
    public FundRequest submit(@RequestBody FundRequest request) {
        request.setStatus("PENDING");
        return repo.save(request);
    }

    // EMPLOYEE: view own requests
    @GetMapping("/employee/{employeeId}")
    public List<FundRequest> employeeRequests(@PathVariable Long employeeId) {
        return repo.findByEmployeeId(employeeId);
    }

    // FINANCE: view pending requests
    @GetMapping("/finance")
    public List<FundRequest> financeRequests() {
        return repo.findByStatus("PENDING");
    }

    // FINANCE: approve / reject
    @PostMapping("/process/{id}")
    public FundRequest process(
            @PathVariable Long id,
            @RequestParam String action,
            @RequestParam(required = false) String comment
    ) {
        FundRequest fr = repo.findById(id).orElseThrow();
        fr.setStatus(action.equals("APPROVE") ? "APPROVED" : "REJECTED");
        fr.setFinanceComment(comment);
        return repo.save(fr);
    }
}
