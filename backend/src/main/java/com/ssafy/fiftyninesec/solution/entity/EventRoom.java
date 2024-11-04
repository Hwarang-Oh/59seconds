package com.ssafy.fiftyninesec.solution.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "EventRoom")
public class EventRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer roomId;

    private Integer memberId;

    @Column(nullable = false)
    private String title;

    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status; // "UPCOMING" 또는 "COMPLETED"

    @Column(nullable = false)
    private LocalDateTime createdAt;

    private LocalDateTime eventTime;

    private Integer winnerNum;

    private String enterCode;

    private Integer unlockCount;

    private String bannerImage;

    private String squareImage;

    private String rectangleImage;

    public enum Status {
        UPCOMING,
        COMPLETED
    }
}