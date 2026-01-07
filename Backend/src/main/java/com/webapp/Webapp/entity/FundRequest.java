package com.webapp.Webapp.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "fund_requests")
public class FundRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long employeeId;
    private String employeeName;
    private String phone;
    private String department;

    @Column(columnDefinition = "TEXT")
    private String reason;

    private Double amount;
    private LocalDate expectedDate;

    @Column(columnDefinition = "TEXT")
    private String remarks;

    private String status = "PENDING";

    @Column(columnDefinition = "TEXT")
    private String financeComment;

    private LocalDateTime createdAt = LocalDateTime.now();

    // getters & setters
    public Long getId() { return id; }
    public Long getEmployeeId() { return employeeId; }
    public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }

    public String getEmployeeName() { return employeeName; }
    public void setEmployeeName(String employeeName) { this.employeeName = employeeName; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public LocalDate getExpectedDate() { return expectedDate; }
    public void setExpectedDate(LocalDate expectedDate) { this.expectedDate = expectedDate; }

    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getFinanceComment() { return financeComment; }
    public void setFinanceComment(String financeComment) { this.financeComment = financeComment; }
}
