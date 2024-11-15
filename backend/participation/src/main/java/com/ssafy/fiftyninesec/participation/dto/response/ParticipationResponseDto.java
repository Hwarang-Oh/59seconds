package com.ssafy.fiftyninesec.participation.dto.response;

import com.ssafy.fiftyninesec.participation.entity.Participation;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParticipationResponseDto {
    private long eventId;
    private long memberId;
    private LocalDateTime joinedAt;
    private int ranking;
    private boolean isWinner;
    private String winnerName;

    public static ParticipationResponseDto of(Participation participation) {
        return ParticipationResponseDto.builder()
                .eventId(participation.getRoomId())
                .memberId(participation.getMemberId())
                .joinedAt(participation.getJoinedAt())
                .ranking(participation.getRanking())
                .isWinner(participation.getIsWinner())
                .build();
    }

    public static ParticipationResponseDto of(Participation participation, String name) {
        return ParticipationResponseDto.builder()
                .eventId(participation.getRoomId())
                .memberId(participation.getMemberId())
                .joinedAt(participation.getJoinedAt())
                .ranking(participation.getRanking())
                .isWinner(participation.getIsWinner())
                .winnerName(name)
                .build();
    }
}