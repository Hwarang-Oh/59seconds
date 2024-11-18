package com.ssafy.fiftyninesec.search.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "SearchLog")
public class SearchLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long searchId;

    private Long memberId;

    @ManyToOne
    @JoinColumn(name = "keyword_id")
    private Keyword keyword;

    @Column(nullable = false)
    private LocalDateTime searchedAt;
}