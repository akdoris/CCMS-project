package com.ccms.backend.repositories;

import com.ccms.backend.models.BrandCollab;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BrandCollabRepository extends MongoRepository<BrandCollab, String> {
    List<BrandCollab> findByUserIdOrderByCreatedAtDesc(String userId);
    Optional<BrandCollab> findByIdAndUserId(String id, String userId);
    void deleteByIdAndUserId(String id, String userId);
}