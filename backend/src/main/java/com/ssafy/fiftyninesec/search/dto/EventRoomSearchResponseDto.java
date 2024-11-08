package com.ssafy.fiftyninesec.search.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Builder
@Data
public class EventRoomSearchResponseDto {
    private Long eventId;
    private String title;
    private String description;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Integer winnerNum;
    private String bannerImage;
    private String squareImage;
    private String rectangleImage;
}
