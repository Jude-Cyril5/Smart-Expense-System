package com.webapp.Webapp.dto;

import com.webapp.Webapp.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginResponse {
    private Long userId;
    private String username;
    private Role role;
}
