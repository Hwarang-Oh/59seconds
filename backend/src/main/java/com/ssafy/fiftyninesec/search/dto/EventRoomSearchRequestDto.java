package com.ssafy.fiftyninesec.search.dto;

import lombok.Data;

@Data
public class EventRoomSearchRequestDto {
    private String keyword; // 검색에 사용할 키워드
    private Long memberId;  // 회원 ID
}