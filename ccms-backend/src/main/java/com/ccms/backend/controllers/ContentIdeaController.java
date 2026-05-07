package com.ccms.backend.controllers;

import com.ccms.backend.dto.ApiResponse;
import com.ccms.backend.models.ContentIdea;
import com.ccms.backend.services.ContentIdeaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ideas")
@RequiredArgsConstructor
public class ContentIdeaController {

    private final ContentIdeaService service;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ContentIdea>>> getAll(Authentication auth) {
        String userId = (String) auth.getPrincipal();
        List<ContentIdea> ideas = service.getAll(userId);
        return ResponseEntity.ok(
            ApiResponse.<List<ContentIdea>>builder()
                .success(true).message("Ideas retrieved").data(ideas).build()
        );
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ContentIdea>> create(
            @RequestBody ContentIdea idea,
            Authentication auth
    ) {
        String userId     = (String) auth.getPrincipal();
        ContentIdea saved = service.create(idea, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(
            ApiResponse.<ContentIdea>builder()
                .success(true).message("Idea created").data(saved).build()
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ContentIdea>> update(
            @PathVariable String id,
            @RequestBody Map<String, Object> updates,
            Authentication auth
    ) {
        String userId      = (String) auth.getPrincipal();
        ContentIdea updated = service.update(id, updates, userId);
        return ResponseEntity.ok(
            ApiResponse.<ContentIdea>builder()
                .success(true).message("Idea updated").data(updated).build()
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(
            @PathVariable String id,
            Authentication auth
    ) {
        String userId = (String) auth.getPrincipal();
        service.delete(id, userId);
        return ResponseEntity.ok(
            ApiResponse.<Void>builder()
                .success(true).message("Idea deleted").build()
        );
    }
}