package com.ssafy.fiftyninesec.participation.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class EventRoomResponseDto {
    private long id;
    private LocalDateTime startTime;
    private int winnerNum;
}