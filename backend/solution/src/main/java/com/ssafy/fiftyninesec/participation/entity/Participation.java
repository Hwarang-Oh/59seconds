package com.ssafy.fiftyninesec.participation.entity;

import com.ssafy.fiftyninesec.solution.entity.EventRoom;
import com.ssafy.fiftyninesec.solution.entity.Member;
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

    @ManyToOne
    @JoinColumn(name = "room_id")
    private EventRoom room;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "joined_at", nullable = false)
    private LocalDateTime joinedAt;

    @Column(name = "ranking")
    private Integer ranking;

    @Column(name = "is_winner")
    private Boolean isWinner;
}