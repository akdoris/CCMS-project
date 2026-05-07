package com.ccms.backend.services;

import com.ccms.backend.models.ContentIdea;
import com.ccms.backend.repositories.ContentIdeaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ContentIdeaService {

    private final ContentIdeaRepository repository;

    public List<ContentIdea> getAll(String userId) {
        return repository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public ContentIdea create(ContentIdea idea, String userId) {
        idea.setUserId(userId);
        return repository.save(idea);
    }

    public ContentIdea update(String id, Map<String, Object> updates, String userId) {
        ContentIdea idea = repository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Idea not found"));

        if (updates.containsKey("title"))       idea.setTitle((String) updates.get("title"));
        if (updates.containsKey("description")) idea.setDescription((String) updates.get("description"));
        if (updates.containsKey("category"))    idea.setCategory((String) updates.get("category"));
        if (updates.containsKey("platform"))    idea.setPlatform((String) updates.get("platform"));
        if (updates.containsKey("status"))      idea.setStatus((String) updates.get("status"));

        return repository.save(idea);
    }

    public void delete(String id, String userId) {
        repository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Idea not found"));
        repository.deleteByIdAndUserId(id, userId);
    }
}