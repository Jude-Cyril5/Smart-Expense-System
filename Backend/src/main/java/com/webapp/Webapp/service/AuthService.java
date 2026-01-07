package com.webapp.Webapp.service;

import com.webapp.Webapp.dto.LoginRequest;
import com.webapp.Webapp.dto.LoginResponse;
import com.webapp.Webapp.dto.SignupRequest;   // ✅ IMPORT THIS
import com.webapp.Webapp.entity.User;
import com.webapp.Webapp.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Invalid username"));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return new LoginResponse(
                user.getId(),
                user.getUsername(),
                user.getRole()
        );
    }

    // ✅ THIS MUST MATCH CONTROLLER
    public void signup(SignupRequest request) {

        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(request.getPassword()); // plain text (OK for now)
        user.setRole(request.getRole());

        userRepository.save(user);
    }
}
