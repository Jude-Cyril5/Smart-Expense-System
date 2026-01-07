package com.webapp.Webapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "expenses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    @Column(precision = 12, scale = 2) // ✅ money-safe
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    private ExpenseStatus status = ExpenseStatus.SUBMITTED;

    private String pdfPath;

    private String managerComment;

    private LocalDateTime createdAt = LocalDateTime.now();

    // ✅ IMPORTANT: prevents infinite JSON loop + finance UI safe
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User employee;
}
