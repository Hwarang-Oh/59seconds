package com.ssafy.fiftyninesec.solution.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class InfluencerEventResponseDto {
    private Long eventId;
    private String title;
    private String status;
    private Integer participantCount;
    private LocalDateTime endTime;
}
