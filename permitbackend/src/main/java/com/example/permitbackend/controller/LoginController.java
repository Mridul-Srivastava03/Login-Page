package com.example.permitbackend.controller;

import com.example.permitbackend.config.JwtUtil;
import com.example.permitbackend.model.UserRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin
public class LoginController {

    private final JwtUtil jwtUtil;

    public LoginController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserRequest user) {
        System.out.println("Username: " + user.getUsername());
        System.out.println("Password: " + user.getPassword());
        if ("admin".equals(user.getUsername()) && "admin123".equals(user.getPassword())) {
            String token = jwtUtil.generateToken(user.getUsername());
            return ResponseEntity.ok(Map.of("token", token));
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
}
