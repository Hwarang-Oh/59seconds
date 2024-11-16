package com.ssafy.fiftyninesec.solution.client.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ParticipatedEventFeignResponseDto {
    private long participationId;
    private long roomId;
    private long memberId;
    private boolean isWinner;
    private int ranking;

    public boolean getIsWinner() {
        return isWinner;
    }
}