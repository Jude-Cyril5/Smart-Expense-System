package com.webapp.Webapp.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.webapp.Webapp.dto.ExpenseRequest;
import com.webapp.Webapp.entity.Expense;
import com.webapp.Webapp.entity.User;
import com.webapp.Webapp.repository.ExpenseRepository;
import com.webapp.Webapp.repository.UserRepository;
import com.webapp.Webapp.service.ExpenseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;
    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;

    public ExpenseController(
            ExpenseService expenseService,
            ExpenseRepository expenseRepository,
            UserRepository userRepository
    ) {
        this.expenseService = expenseService;
        this.expenseRepository = expenseRepository;
        this.userRepository = userRepository;
    }

    // 🔹 SUBMIT EXPENSE (EMPLOYEE)
    @PostMapping(
            value = "/submit",
            consumes = "multipart/form-data"
    )
    public ResponseEntity<Expense> submitExpense(
            @RequestPart("data") String data,
            @RequestPart("file") MultipartFile file
    ) throws Exception {

        ObjectMapper mapper = new ObjectMapper();
        ExpenseRequest request = mapper.readValue(data, ExpenseRequest.class);

        return ResponseEntity.ok(
                expenseService.submitExpense(request, file)
        );
    }

    // 🔹 GET EMPLOYEE EXPENSES (THIS FIXES YOUR 404)
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<Expense>> getEmployeeExpenses(
            @PathVariable Long employeeId
    ) {
        User user = userRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return ResponseEntity.ok(
                expenseRepository.findByEmployee(user)
        );
    }

    // 🔹 VIEW / DOWNLOAD PDF (MANAGER & FINANCE)
    @GetMapping("/pdf/{expenseId}")
    public ResponseEntity<Resource> viewPdf(@PathVariable Long expenseId) throws Exception {

        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        Path filePath = Paths.get(expense.getPdfPath());
        Resource resource = new UrlResource(filePath.toUri());

        if (!resource.exists()) {
            throw new RuntimeException("PDF file not found");
        }

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"receipt.pdf\"")
                .body(resource);
    }

}
