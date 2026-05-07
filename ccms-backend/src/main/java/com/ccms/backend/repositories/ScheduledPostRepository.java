package com.ccms.backend.repositories;

import com.ccms.backend.models.ScheduledPost;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ScheduledPostRepository extends MongoRepository<ScheduledPost, String> {
    List<ScheduledPost> findByUserIdOrderByCreatedAtDesc(String userId);
    Optional<ScheduledPost> findByIdAndUserId(String id, String userId);
    void deleteByIdAndUserId(String id, String userId);
}