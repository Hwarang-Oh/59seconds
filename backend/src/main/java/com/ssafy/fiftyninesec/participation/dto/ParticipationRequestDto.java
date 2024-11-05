package com.ssafy.fiftyninesec.participation.dto;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ParticipationRequestDto {
    private Long roomId; 
    private Long memberId;
}
