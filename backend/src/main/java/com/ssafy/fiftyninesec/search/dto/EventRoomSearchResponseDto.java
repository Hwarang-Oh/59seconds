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
    private LocalDateTime endTime;
    private Integer winnerNum;
    private String bannerImage;
    private String rectangleImage;
    private String mainPrize;
    private Integer prizeCount;
}
