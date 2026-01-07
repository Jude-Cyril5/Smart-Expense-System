package com.webapp.Webapp.repository;

import com.webapp.Webapp.entity.Expense;
import com.webapp.Webapp.entity.ExpenseStatus;
import com.webapp.Webapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    // For Manager & Finance dashboards
    List<Expense> findByStatus(ExpenseStatus status);

    // ✅ REQUIRED for Employee Dashboard
    List<Expense> findByEmployee(User employee);
}
