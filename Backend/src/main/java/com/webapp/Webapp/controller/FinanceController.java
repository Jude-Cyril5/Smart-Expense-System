package com.webapp.Webapp.controller;

import com.webapp.Webapp.entity.Expense;
import com.webapp.Webapp.entity.ExpenseStatus;
import com.webapp.Webapp.repository.ExpenseRepository;
import com.webapp.Webapp.service.FinanceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/finance")
@CrossOrigin(origins = "http://localhost:3000")
public class FinanceController {

    private final ExpenseRepository expenseRepository;
    private final FinanceService financeService;

    public FinanceController(ExpenseRepository expenseRepository,
                             FinanceService financeService) {
        this.expenseRepository = expenseRepository;
        this.financeService = financeService;
    }

    // 🔹 View approved expenses
    @GetMapping("/expenses")
    public ResponseEntity<List<Expense>> getApprovedExpenses() {
        return ResponseEntity.ok(
                expenseRepository.findByStatus(ExpenseStatus.APPROVED)
        );
    }

    // 🔹 Mark as reimbursed
    @PostMapping("/reimburse/{expenseId}")
    public ResponseEntity<Expense> reimburseExpense(
            @PathVariable Long expenseId
    ) {
        return ResponseEntity.ok(financeService.reimburse(expenseId));
    }
}
