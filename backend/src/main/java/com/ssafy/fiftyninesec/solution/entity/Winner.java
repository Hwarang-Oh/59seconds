package com.ssafy.fiftyninesec.solution.entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "winner")
@Getter
@NoArgsConstructor
public class Winner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "winner_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    private EventRoom room;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(name = "winner_name", length = 10, nullable = false)
    private String winnerName;

    @Column(name = "address", length = 100)
    private String address;

    @Column(name = "phone", length = 50)
    private String phone;

    @Column(name = "ranking", nullable = false)
    private int ranking;
}
