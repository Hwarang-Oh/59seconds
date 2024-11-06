package com.ssafy.fiftyninesec.solution.dto.response;

import com.ssafy.fiftyninesec.solution.dto.MemberResponseDto;
import com.ssafy.fiftyninesec.solution.dto.PrizeDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventRoomResponseDto {
    private MemberResponseDto memberResponseDto;

    private String title;
    private String description;
    private String status;

    private LocalDateTime startTime;
    private LocalDateTime endTime;

    private Integer winnerNum;
    private String enterCode;
    private Integer unlockCount;

    private String bannerImage;
    private String squareImage;
    private String rectangleImage;

    private LocalDateTime createdAt;
    private List<PrizeDto> prizes;
}