package com.webapp.Webapp.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ManagerActionRequest {
    private Long expenseId;
    private String action; // APPROVE or REJECT
    private String comment;
}
