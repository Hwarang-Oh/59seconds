package com.ssafy.fiftyninesec.solution.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class WinnerInfoDto {
    private final String winnerName;
    private final String address;
    private final String prize;
    private final String phone;
    private final int ranking;

    public static WinnerInfoDto of(String winnerName, String address, String prize, String phone, int ranking) {
        return WinnerInfoDto.builder()
                .winnerName(winnerName)
                .address(address)
                .prize(prize)
                .phone(phone)
                .ranking(ranking)
                .build();
    }
}