package com.ccms.backend.services;

import com.ccms.backend.models.ScheduledPost;
import com.ccms.backend.repositories.ScheduledPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ScheduledPostService {

    private final ScheduledPostRepository repository;

    public List<ScheduledPost> getAll(String userId) {
        return repository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public ScheduledPost create(ScheduledPost post, String userId) {
        post.setUserId(userId);
        return repository.save(post);
    }

    public ScheduledPost update(String id, Map<String, Object> updates, String userId) {
        ScheduledPost post = repository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        if (updates.containsKey("title"))    post.setTitle((String) updates.get("title"));
        if (updates.containsKey("platform")) post.setPlatform((String) updates.get("platform"));
        if (updates.containsKey("date"))     post.setDate((String) updates.get("date"));
        if (updates.containsKey("time"))     post.setTime((String) updates.get("time"));
        if (updates.containsKey("status"))   post.setStatus((String) updates.get("status"));

        return repository.save(post);
    }

    public void delete(String id, String userId) {
        repository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        repository.deleteByIdAndUserId(id, userId);
    }
}