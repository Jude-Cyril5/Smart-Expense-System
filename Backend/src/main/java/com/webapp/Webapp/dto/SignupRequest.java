package com.webapp.Webapp.dto;

import com.webapp.Webapp.entity.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequest {
    private String username;
    private String password;
    private Role role;
}
