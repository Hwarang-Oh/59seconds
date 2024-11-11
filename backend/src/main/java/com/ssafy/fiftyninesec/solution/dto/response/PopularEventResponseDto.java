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
    private Long eventId; // Type: number
    private String title;
    private Integer ranking; // Type: index로 자체 가능
    private String description;
    private LocalDateTime endTime; // Type: string
    private String mainPrize;
    private Integer prizeCount;
    private Integer unlockCount;
    private Boolean isDeadline; // Type: boolean
    private String bannerImage;
    private String rectangleImage;

    public static PopularEventResponseDto of(EventRoom eventRoom) {
        return PopularEventResponseDto.builder()
                .eventId(eventRoom.getId())
                .title(eventRoom.getTitle())
                .ranking(eventRoom.getUnlockCount()) // 예시로 unlockCount를 ranking으로 사용
                .description(eventRoom.getDescription())
                .endTime(eventRoom.getEndTime())
                .mainPrize("Example Prize") // 실제 prize 정보가 있는 경우 변경
                .prizeCount(eventRoom.getUnlockCount()) // 예시
                .unlockCount(eventRoom.getUnlockCount())
                .isDeadline(eventRoom.getEndTime().isBefore(LocalDateTime.now()))
                .bannerImage(eventRoom.getBannerImage())
                .rectangleImage(eventRoom.getRectangleImage())
                .build();
    }

}
