package com.ssafy.fiftyninesec.solution.dto.response;

import com.ssafy.fiftyninesec.solution.entity.EventRoom;
import lombok.Builder;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PopularEventResponseDto {
    private Long eventId;
    private String title;
    private int ranking = 0;
    private String description;
    private LocalDateTime endTime;
    private String mainPrize;
    private int prizeCount = 0;
    private int unlockCount = 0;
    private Boolean isDeadline;
    private String bannerImage;
    private String rectangleImage;

    public static PopularEventResponseDto of(EventRoom eventRoom, String mainPrize, int prizeCount, int ranking) {
        boolean isDeadline = eventRoom.getEndTime().isBefore(LocalDateTime.now().plusHours(24));
        return PopularEventResponseDto.builder()
                .eventId(eventRoom.getId())
                .title(eventRoom.getTitle())
                .ranking(ranking)
                .description(eventRoom.getDescription())
                .endTime(eventRoom.getEndTime())
                .prizeCount(prizeCount)
                .unlockCount(eventRoom.getUnlockCount())
                .isDeadline(isDeadline)
                .mainPrize(mainPrize)
                .bannerImage(eventRoom.getBannerImage())
                .rectangleImage(eventRoom.getRectangleImage())
                .build();
    }

}
