package com.ssafy.fiftyninesec.solution.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Prize")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Prize {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long prizeId;

    @ManyToOne
    @JoinColumn(name = "room_id", nullable = false)
    private EventRoom eventRoom;

    private String prizeType;

    private Integer winnerCount;

    private String prizeName;

    private Integer ranking;
}
