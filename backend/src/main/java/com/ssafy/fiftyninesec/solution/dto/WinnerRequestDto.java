package com.ssafy.fiftyninesec.solution.dto;

import lombok.Data;

@Data
public class WinnerRequestDto {
    private Long memberId;
    private String winnerName;
    private String address;
    private String phone;
    private Integer ranking;
}
