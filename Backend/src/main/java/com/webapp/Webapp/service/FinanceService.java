package com.webapp.Webapp.service;

import com.webapp.Webapp.entity.Expense;
import com.webapp.Webapp.entity.ExpenseStatus;
import com.webapp.Webapp.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

@Service
public class FinanceService {

    private final ExpenseRepository expenseRepository;

    public FinanceService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public Expense reimburse(Long expenseId) {

        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() ->
                        new RuntimeException("Expense ID " + expenseId + " not found")
                );

        if (!expense.getStatus().equals(ExpenseStatus.APPROVED)) {
            throw new RuntimeException("Only APPROVED expenses can be reimbursed");
        }

        expense.setStatus(ExpenseStatus.REIMBURSED);

        return expenseRepository.save(expense);
    }
}
