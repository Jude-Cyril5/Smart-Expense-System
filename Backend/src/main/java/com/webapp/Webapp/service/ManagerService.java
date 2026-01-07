package com.webapp.Webapp.service;

import com.webapp.Webapp.dto.ManagerActionRequest;
import com.webapp.Webapp.entity.Expense;
import com.webapp.Webapp.entity.ExpenseStatus;
import com.webapp.Webapp.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

@Service
public class ManagerService {

    private final ExpenseRepository expenseRepository;

    public ManagerService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public Expense processExpense(ManagerActionRequest request) {

        Expense expense = expenseRepository.findById(request.getExpenseId())
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        if (!expense.getStatus().equals(ExpenseStatus.SUBMITTED)) {
            throw new RuntimeException("Expense already processed");
        }

        if ("APPROVE".equalsIgnoreCase(request.getAction())) {
            expense.setStatus(ExpenseStatus.APPROVED);
        } else if ("REJECT".equalsIgnoreCase(request.getAction())) {
            expense.setStatus(ExpenseStatus.REJECTED);
        } else {
            throw new RuntimeException("Invalid action");
        }

        expense.setManagerComment(request.getComment());

        return expenseRepository.save(expense);
    }
}
