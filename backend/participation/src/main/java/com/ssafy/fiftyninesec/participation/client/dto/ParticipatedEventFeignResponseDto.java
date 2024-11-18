package com.ssafy.fiftyninesec.participation.client.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.fiftyninesec.participation.entity.Participation;
import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class ParticipatedEventFeignResponseDto {
    private long participationId;
    private long roomId;
    private long memberId;
    private boolean isWinner;
    private int ranking

    public static ParticipatedEventFeignResponseDto from(Participation participation) {
        return ParticipatedEventFeignResponseDto.builder()
                .participationId(participation.getParticipationId())
                .roomId(participation.getRoomId())
                .memberId(participation.getMemberId())
                .isWinner(participation.getIsWinner())
                .ranking(participation.getRanking())
                .build();
    }
}