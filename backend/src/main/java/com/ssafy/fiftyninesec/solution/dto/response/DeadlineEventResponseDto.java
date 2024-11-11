package com.ssafy.fiftyninesec.solution.dto.response;

import com.ssafy.fiftyninesec.solution.entity.EventRoom;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class DeadlineEventResponseDto {
    private Long eventId;
    private String title;
    private LocalDateTime endTime;
    private String mainPrize;
    private int prizeCount;
    private String rectangleImage;

    public static DeadlineEventResponseDto of(EventRoom eventRoom, String mainPrize, int prizeCount) {
        return DeadlineEventResponseDto.builder()
                .eventId(eventRoom.getId())
                .title(eventRoom.getTitle())
                .endTime(eventRoom.getEndTime())
                .mainPrize(mainPrize)
                .prizeCount(prizeCount)
                .rectangleImage(eventRoom.getRectangleImage())
                .build();
    }
}