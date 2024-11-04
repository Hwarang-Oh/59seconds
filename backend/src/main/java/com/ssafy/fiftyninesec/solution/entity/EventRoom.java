package com.ssafy.fiftyninesec.solution.entity;

import jakarta.persistence.*;
import lombok.*;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import java.time.LocalDateTime;

@Entity
@Table(name = "EventRoom")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer roomId;

    @Column(name = "member_id")
    private Integer memberId;

    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Column(name = "description", length = 255)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false,
            columnDefinition = "ENUM('NOT_STARTED', 'ONGOING', 'COMPLETED', 'COMPLETED_NO_WINNER_INFO')")
    private EventStatus status;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "event_time")
    private LocalDateTime eventTime;

    @Column(name = "winner_num")
    private Integer winnerNum;

    @Column(name = "enter_code", length = 10)
    private String enterCode;

    @Column(name = "unlock_count")
    private Integer unlockCount;

    @Column(name = "banner_image", length = 100)
    private String bannerImage;

    @Column(name = "square_image", length = 100)
    private String squareImage;

    @Column(name = "rectangle_image", length = 100)
    private String rectangleImage;
}
