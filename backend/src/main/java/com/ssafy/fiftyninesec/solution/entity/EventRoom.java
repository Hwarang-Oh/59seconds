package com.ssafy.fiftyninesec.solution.entity;

import jakarta.persistence.*;
import lombok.*;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "EventRoom")
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Cacheable
public class EventRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="room_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(length = 255)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column
    private EventStatus status;

    @Column(name = "start_time", columnDefinition = "DATETIME")
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime startTime;

    @Column(name = "end_time", columnDefinition = "DATETIME")
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime endTime;

    @Column(nullable = false)
    private Integer winnerNum;

    private String enterCode;

    @Column(nullable = false)
    private Integer unlockCount = 0;

    private String bannerImage;

    private String squareImage;

    private String rectangleImage;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    public void increaseUnlockCount() {
        this.unlockCount = this.unlockCount + 1;
    }
}
