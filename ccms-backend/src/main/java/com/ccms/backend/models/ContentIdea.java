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
@Document(collection = "content_ideas")
public class ContentIdea {

    @Id
    private String id;

    private String title;

    @Builder.Default
    private String description = "";

    @Builder.Default
    private String category = "";

    private String platform;

    @Builder.Default
    private String status = "Draft";

    private String userId;

    @CreatedDate
    private LocalDateTime createdAt;
}