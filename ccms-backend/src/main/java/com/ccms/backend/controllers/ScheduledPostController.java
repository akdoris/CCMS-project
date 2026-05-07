package com.ccms.backend.controllers;

import com.ccms.backend.dto.ApiResponse;
import com.ccms.backend.models.ScheduledPost;
import com.ccms.backend.services.ScheduledPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/schedule")
@RequiredArgsConstructor
public class ScheduledPostController {

    private final ScheduledPostService service;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ScheduledPost>>> getAll(Authentication auth) {
        String userId = (String) auth.getPrincipal();
        return ResponseEntity.ok(
            ApiResponse.<List<ScheduledPost>>builder()
                .success(true).message("Posts retrieved")
                .data(service.getAll(userId)).build()
        );
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ScheduledPost>> create(
            @RequestBody ScheduledPost post, Authentication auth
    ) {
        String userId = (String) auth.getPrincipal();
        ScheduledPost saved = service.create(post, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(
            ApiResponse.<ScheduledPost>builder()
                .success(true).message("Post scheduled").data(saved).build()
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ScheduledPost>> update(
            @PathVariable String id,
            @RequestBody Map<String, Object> updates,
            Authentication auth
    ) {
        String userId = (String) auth.getPrincipal();
        ScheduledPost updated = service.update(id, updates, userId);
        return ResponseEntity.ok(
            ApiResponse.<ScheduledPost>builder()
                .success(true).message("Post updated").data(updated).build()
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
                .success(true).message("Post deleted").build()
        );
    }
}