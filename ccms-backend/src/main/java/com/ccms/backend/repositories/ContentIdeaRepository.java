package com.ccms.backend.repositories;

import com.ccms.backend.models.ContentIdea;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContentIdeaRepository extends MongoRepository<ContentIdea, String> {
    List<ContentIdea> findByUserIdOrderByCreatedAtDesc(String userId);
    Optional<ContentIdea> findByIdAndUserId(String id, String userId);
    void deleteByIdAndUserId(String id, String userId);
}