package com.webapp.Webapp.controller;

import com.webapp.Webapp.dto.ManagerActionRequest;
import com.webapp.Webapp.entity.Expense;
import com.webapp.Webapp.entity.ExpenseStatus;
import com.webapp.Webapp.repository.ExpenseRepository;
import com.webapp.Webapp.service.ManagerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/manager")
@CrossOrigin(origins = "http://localhost:3000")
public class ManagerController {

    private final ExpenseRepository expenseRepository;
    private final ManagerService managerService;

    public ManagerController(ExpenseRepository expenseRepository,
                             ManagerService managerService) {
        this.expenseRepository = expenseRepository;
        this.managerService = managerService;
    }

    // 🔹 View all submitted expenses
    @GetMapping("/expenses")
    public ResponseEntity<List<Expense>> getSubmittedExpenses() {
        return ResponseEntity.ok(
                expenseRepository.findByStatus(ExpenseStatus.SUBMITTED)
        );
    }

    // 🔹 Approve / Reject expense
    @PostMapping("/process")
    public ResponseEntity<Expense> processExpense(
            @RequestBody ManagerActionRequest request
    ) {
        return ResponseEntity.ok(managerService.processExpense(request));
    }
}
