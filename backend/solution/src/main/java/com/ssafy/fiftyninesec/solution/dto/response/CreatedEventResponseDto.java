package com.ssafy.fiftyninesec.solution.dto.response;

import com.ssafy.fiftyninesec.solution.entity.EventRoom;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreatedEventResponseDto {
    private Long eventId;
    private String title;
    private String status;

    private LocalDateTime startTime;
    private LocalDateTime endTime;

    private String enterCode;
    private int unlockCount;

    private String bannerUrl;
    private String rectangleUrl;

    private LocalDateTime createdAt;

    public static CreatedEventResponseDto from(EventRoom eventRoom) {
        return CreatedEventResponseDto.builder()
                .eventId(eventRoom.getId())
                .title(eventRoom.getTitle())
                .status(eventRoom.getStatus().name())
                .startTime(eventRoom.getStartTime())
                .endTime(eventRoom.getEndTime())
                .enterCode(eventRoom.getEnterCode())
                .unlockCount(eventRoom.getUnlockCount())
                .bannerUrl(eventRoom.getBannerImage())
                .rectangleUrl(eventRoom.getRectangleImage())
                .createdAt(eventRoom.getCreatedAt())
                .build();
    }
}
