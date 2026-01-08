package com.webapp.Webapp.service;

import com.webapp.Webapp.dto.ExpenseRequest;
import com.webapp.Webapp.entity.Expense;
import com.webapp.Webapp.entity.ExpenseStatus;
import com.webapp.Webapp.entity.User;
import com.webapp.Webapp.repository.ExpenseRepository;
import com.webapp.Webapp.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;

    private static final String UPLOAD_DIR = "D:/uploads/expenses";

    public ExpenseService(ExpenseRepository expenseRepository,
                          UserRepository userRepository) {
        this.expenseRepository = expenseRepository;
        this.userRepository = userRepository;
    }

    public Expense submitExpense(ExpenseRequest request, MultipartFile file) throws Exception {

        if (file == null || file.isEmpty()) {
            throw new RuntimeException("PDF file is required");
        }

        User employee = userRepository.findById(request.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        // ✅ CREATE DIRECTORY IF NOT EXISTS
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);

        Files.write(filePath, file.getBytes());

        Expense expense = new Expense();
        expense.setTitle(request.getTitle());
        expense.setDescription(request.getDescription());
        expense.setAmount(request.getAmount()); // BigDecimal ✔
        expense.setEmployee(employee);
        expense.setPdfPath(filePath.toString());
        expense.setStatus(ExpenseStatus.SUBMITTED);

        return expenseRepository.save(expense);
    }
}