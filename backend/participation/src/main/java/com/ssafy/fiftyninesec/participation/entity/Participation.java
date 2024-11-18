package com.ssafy.fiftyninesec.participation.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "Participation")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Participation { // 담당자가 달라서 미리 만들어둔 가짜 엔티티 입니다, 외래키 걸어야함

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "participation_id")
    private Long participationId;

    // 외래키를 ID로 변경
    @Column(name = "room_id", nullable = false)
    private Long roomId;

    @Column(name = "member_id", nullable = false)
    private Long memberId;

    @Column(name = "joined_at", nullable = false)
    private LocalDateTime joinedAt;

    @Column(name = "ranking")
    private Integer ranking;

    @Column(name = "is_winner")
    private Boolean isWinner;
}