package com.ssafy.fiftyninesec.solution.dto.response;

import com.ssafy.fiftyninesec.solution.entity.EventRoom;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.ZoneId;

@Data
@Builder
public class DeadlineEventResponseDto {
    private Long eventId;       // Type: number
    private String title;
    private String leftTime;    // Type: endTime이 있다면, 자체 가능
    private String mainPrize;
    private Integer prizeCount;
    private String rectangleImage;
}
