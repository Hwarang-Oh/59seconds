package com.ssafy.fiftyninesec.search.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Keyword")
public class Keyword {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long keywordId;

    @Column(nullable = false)
    private String word;

    // 검색 횟수를 저장하는 필드
    private int searchCount;
}
