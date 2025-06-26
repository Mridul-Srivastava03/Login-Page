package com.example.permitbackend.controller;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // 👈 optional if not using global config
public class PermitButtonController {

    @GetMapping("/permit-buttons")
    public ResponseEntity<String> getPermitButtons() throws IOException {
        System.out.println("Permit buttons endpoint hit!"); // 👈 check if endpoint is reached

        ClassPathResource resource = new ClassPathResource("ptw_button.json");
        String json = new String(Files.readAllBytes(resource.getFile().toPath()));
        return ResponseEntity.ok(json); // returns raw JSON string
    }
}
