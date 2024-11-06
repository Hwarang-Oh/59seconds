package com.ssafy.fiftyninesec.participation.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParticipationResponseDto {
    private Long eventId;
    private Long memberId;
    private LocalDateTime joinedAt;
    private Integer ranking;
    private Boolean isWinner;
}