package com.ccms.backend.controllers;

import com.ccms.backend.dto.ApiResponse;
import com.ccms.backend.models.BrandCollab;
import com.ccms.backend.services.BrandCollabService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/collabs")
@RequiredArgsConstructor
public class BrandCollabController {

    private final BrandCollabService service;

    @GetMapping
    public ResponseEntity<ApiResponse<List<BrandCollab>>> getAll(Authentication auth) {
        String userId = (String) auth.getPrincipal();
        return ResponseEntity.ok(
            ApiResponse.<List<BrandCollab>>builder()
                .success(true).message("Collabs retrieved")
                .data(service.getAll(userId)).build()
        );
    }

    @PostMapping
    public ResponseEntity<ApiResponse<BrandCollab>> create(
            @RequestBody BrandCollab collab, Authentication auth
    ) {
        String userId = (String) auth.getPrincipal();
        BrandCollab saved = service.create(collab, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(
            ApiResponse.<BrandCollab>builder()
                .success(true).message("Collaboration created").data(saved).build()
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<BrandCollab>> update(
            @PathVariable String id,
            @RequestBody Map<String, Object> updates,
            Authentication auth
    ) {
        String userId = (String) auth.getPrincipal();
        BrandCollab updated = service.update(id, updates, userId);
        return ResponseEntity.ok(
            ApiResponse.<BrandCollab>builder()
                .success(true).message("Collaboration updated").data(updated).build()
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(
            @PathVariable String id, Authentication auth
    ) {
        String userId = (String) auth.getPrincipal();
        service.delete(id, userId);
        return ResponseEntity.ok(
            ApiResponse.<Void>builder()
                .success(true).message("Collaboration deleted").build()
        );
    }
}