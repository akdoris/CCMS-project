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
@Document(collection = "scheduled_posts")
public class ScheduledPost {

    @Id
    private String id;

    private String title;
    private String platform;
    private String date;

    @Builder.Default
    private String time = "12:00";

    @Builder.Default
    private String status = "Upcoming";

    private String userId;

    @CreatedDate
    private LocalDateTime createdAt;
}