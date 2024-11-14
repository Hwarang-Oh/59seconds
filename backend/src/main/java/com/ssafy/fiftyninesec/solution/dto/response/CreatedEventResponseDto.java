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
    private int unlockCount = 0;

    private String bannerUrl;
    private String rectangleUrl;

    private LocalDateTime createdAt;

    public CreatedEventResponseDto(EventRoom eventRoom) {
        this.eventId = eventRoom.getId();
        this.title = eventRoom.getTitle();
        this.status = eventRoom.getStatus().name();
        this.startTime = eventRoom.getStartTime();
        this.endTime = eventRoom.getEndTime();
        this.enterCode = eventRoom.getEnterCode();
        this.unlockCount = (eventRoom.getUnlockCount());
        this.bannerUrl = eventRoom.getBannerImage();
        this.rectangleUrl = eventRoom.getRectangleImage();
        this.createdAt = eventRoom.getCreatedAt();
    }

}
