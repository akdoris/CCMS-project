package com.ccms.backend.controllers;

import com.ccms.backend.dto.ApiResponse;
import com.ccms.backend.dto.AuthResponse;
import com.ccms.backend.dto.LoginRequest;
import com.ccms.backend.dto.RegisterRequest;
import com.ccms.backend.models.User;
import com.ccms.backend.services.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(
            @Valid @RequestBody RegisterRequest request
    ) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody LoginRequest request
    ) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<User>> getMe(Authentication authentication) {
        String userId = (String) authentication.getPrincipal();
        User user     = authService.getMe(userId);
        user.setPassword(null); // never expose password
        return ResponseEntity.ok(
            ApiResponse.<User>builder()
                .success(true)
                .message("User retrieved")
                .data(user)
                .build()
        );
    }
}