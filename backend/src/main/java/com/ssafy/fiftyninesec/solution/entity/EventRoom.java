package com.ssafy.fiftyninesec.solution.entity;

import jakarta.persistence.*;
import lombok.*;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "EventRoom")
public class EventRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomId;

    private Long memberId;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(length = 255)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EventStatus status;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    @Column(nullable = false)
    private Integer winnerNum;

    private String enterCode;

    private Integer unlockCount;

    private String bannerImage;

    private String squareImage;

    private String rectangleImage;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    public void increaseUnlockCount() {
        this.unlockCount = this.unlockCount + 1;
    }
}
