package com.ccms.backend.services;

import com.ccms.backend.models.BrandCollab;
import com.ccms.backend.repositories.BrandCollabRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class BrandCollabService {

    private final BrandCollabRepository repository;

    public List<BrandCollab> getAll(String userId) {
        return repository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public BrandCollab create(BrandCollab collab, String userId) {
        collab.setUserId(userId);
        return repository.save(collab);
    }

    public BrandCollab update(String id, Map<String, Object> updates, String userId) {
        BrandCollab collab = repository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Collaboration not found"));

        if (updates.containsKey("brand"))        collab.setBrand((String) updates.get("brand"));
        if (updates.containsKey("contact"))      collab.setContact((String) updates.get("contact"));
        if (updates.containsKey("deliverables")) collab.setDeliverables((String) updates.get("deliverables"));
        if (updates.containsKey("deadline"))     collab.setDeadline((String) updates.get("deadline"));
        if (updates.containsKey("status"))       collab.setStatus((String) updates.get("status"));
        if (updates.containsKey("notes"))        collab.setNotes((String) updates.get("notes"));
        if (updates.containsKey("payment"))      collab.setPayment(((Number) updates.get("payment")).doubleValue());
        if (updates.containsKey("progress"))     collab.setProgress(((Number) updates.get("progress")).intValue());

        return repository.save(collab);
    }

    public void delete(String id, String userId) {
        repository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Collaboration not found"));
        repository.deleteByIdAndUserId(id, userId);
    }
}