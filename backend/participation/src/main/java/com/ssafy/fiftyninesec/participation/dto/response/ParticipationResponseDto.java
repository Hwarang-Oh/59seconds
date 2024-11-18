package com.ssafy.fiftyninesec.participation.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.fiftyninesec.participation.entity.Participation;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParticipationResponseDto {
    private long eventId;
    private long memberId;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
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


    public static ParticipationResponseDto from(LinkedHashMap<String, Object> map) {
        LocalDateTime joinedAt = convertToLocalDateTime(map.get("joinedAt"));

        return ParticipationResponseDto.builder()
                .eventId(((Number) map.get("eventId")).longValue())
                .memberId(((Number) map.get("memberId")).longValue())
                .joinedAt(joinedAt)
                .ranking(((Number) map.get("ranking")).intValue())
                .isWinner((Boolean) map.get("isWinner"))
                .winnerName((String) map.get("winnerName"))
                .build();
    }

    private static LocalDateTime convertToLocalDateTime(Object joinedAt) {
        if (joinedAt instanceof ArrayList) {
            @SuppressWarnings("unchecked")
            ArrayList<Integer> dateList = (ArrayList<Integer>) joinedAt;
            return LocalDateTime.of(
                    dateList.get(0), // year
                    dateList.get(1), // month
                    dateList.get(2), // day
                    dateList.get(3), // hour
                    dateList.get(4), // minute
                    dateList.get(5), // second
                    dateList.get(6)  // nanosecond
            );
        } else {
            return LocalDateTime.parse((String) joinedAt);
        }
    }
}