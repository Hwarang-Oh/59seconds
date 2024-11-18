package com.ssafy.fiftyninesec.solution.dto.response;

import com.ssafy.fiftyninesec.solution.dto.WinnerInfoDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class WinnerInfoListResponseDto {
    private List<WinnerInfoDto> winners;
    private String message;
    private boolean success;

    public static WinnerInfoListResponseDto of(List<WinnerInfoDto> winners) {
        return WinnerInfoListResponseDto.builder()
                .winners(winners)
                .build();
    }
}