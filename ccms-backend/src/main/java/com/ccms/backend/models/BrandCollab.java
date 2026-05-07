package com.ccms.backend.models;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "brand_collabs")
public class BrandCollab {

    @Id
    private String id;

    private String brand;

    @Builder.Default
    private String contact = "";

    @Builder.Default
    private String deliverables = "";

    private String deadline;

    @Builder.Default
    private double payment = 0.0;

    @Builder.Default
    private String status = "Pending";

    @Builder.Default
    private String notes = "";

    @Builder.Default
    private int progress = 0;

    private String userId;

    @CreatedDate
    private LocalDateTime createdAt;
}