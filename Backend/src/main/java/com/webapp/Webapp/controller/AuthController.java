package com.webapp.Webapp.controller;




import com.webapp.Webapp.dto.LoginRequest;
import com.webapp.Webapp.dto.LoginResponse;
import com.webapp.Webapp.dto.SignupRequest;
import com.webapp.Webapp.service.AuthService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup(
            @RequestBody SignupRequest request) {

        authService.signup(request);
        return ResponseEntity.ok("Signup successful");
    }
}
