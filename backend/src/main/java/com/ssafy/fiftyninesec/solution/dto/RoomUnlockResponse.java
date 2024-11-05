package com.ssafy.fiftyninesec.solution.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RoomUnlockResponse {
    private boolean success;
    private String message;
}
