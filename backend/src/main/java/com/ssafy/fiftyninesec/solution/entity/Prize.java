package com.ssafy.fiftyninesec.solution.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Prize")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Prize {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="prize_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "room_id", nullable = false)
    private EventRoom eventRoom;

    private String prizeType;
    private Integer winnerCount;
    private String prizeName;
    private Integer ranking;
}