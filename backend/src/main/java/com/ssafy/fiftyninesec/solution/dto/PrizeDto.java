package com.ssafy.fiftyninesec.solution.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PrizeDto {
    private Long prizeId;
    private Long roomId;
    private String prizeType;
    private Integer winnerCount;
    private String prizeName;
    private Integer ranking;
}