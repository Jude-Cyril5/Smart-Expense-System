package com.webapp.Webapp.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ExpenseRequest {
    private Long employeeId;
    private String title;
    private String description;
    private BigDecimal amount;
}
