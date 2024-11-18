package com.ssafy.fiftyninesec.solution.dto.response;

import com.ssafy.fiftyninesec.solution.client.dto.ParticipatedEventFeignResponseDto;
import com.ssafy.fiftyninesec.solution.entity.EventRoom;
import com.ssafy.fiftyninesec.solution.entity.Prize;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParticipatedEventResponseDto {

    // participateInfo
    private Long eventId;
    private int ranking; // 나의 등수
    private boolean isWinner; // 당첨 여부

    //EventInfo
    private String title;            // 이벤트 제목
    private String bannerImage;       // 배너 이미지
    private int totalParticipants; // 총 참여 인원
    private LocalDateTime startTime; // 이벤트 시작 시간

    // PrizeInfo
    private String prizeType;
    private String prizeName;

    public static ParticipatedEventResponseDto from(
            ParticipatedEventFeignResponseDto participation,
            EventRoom eventRoom,
            Prize prize) {

        return ParticipatedEventResponseDto.builder()
                .eventId(participation.getRoomId())
                .ranking(participation.getRanking())
                .isWinner(participation.getIsWinner())

                .title(eventRoom.getTitle())
                .bannerImage(eventRoom.getBannerImage())
                .totalParticipants(eventRoom.getUnlockCount())
                .startTime(eventRoom.getStartTime())

                .prizeType(prize != null ? prize.getPrizeType() : null)
                .prizeName(prize != null ? prize.getPrizeName() : null)
                .build();
    }
}
