package com.ssafy.fiftyninesec.participation.client.dto;

public enum EventStatus {
    NOT_STARTED,           // 이벤트 시작 전
    ONGOING,               // 이벤트 진행 중
    COMPLETED,             // 이벤트가 정상적으로 종료됨
    COMPLETED_NO_WINNER_INFO // 당첨자는 다 채워졌으나 당첨 정보 입력 미완료
}