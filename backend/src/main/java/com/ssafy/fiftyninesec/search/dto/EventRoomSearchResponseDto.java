package com.ssafy.fiftyninesec.search.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class EventRoomSearchResponseDto {
    private Integer roomId;
    private String title;
    private String description;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime eventTime;
    private Integer winnerNum;
    private String bannerImage;
    private String squareImage;
    private String rectangleImage;
}
