package com.ssafy.fiftyninesec.solution.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParticipatedEventResponseDto {
    // participateInfo
    private Long eventId;
    private Integer ranking; // 나의 등수
    private Boolean isWinner; // 당첨 여부

    // PrizeInfo
    private String prizeType;
    private String prizeName;

    //EventInfo
    private String title;            // 이벤트 제목
    private String bannerImage;       // 배너 이미지
    private Integer totalParticipants; // 총 참여 인원
    private LocalDateTime startTime; // 이벤트 시작 시간
}
