package com.ssafy.fiftyninesec.solution.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Table(name = "random_nickname")
public class RandomNickname {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    @Getter
    private String nickname;
}
