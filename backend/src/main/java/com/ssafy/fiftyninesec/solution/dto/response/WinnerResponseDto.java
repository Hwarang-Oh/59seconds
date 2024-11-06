package com.ssafy.fiftyninesec.solution.dto.response;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class WinnerResponseDto {
    private List<WinnerInfo> winners;
    private String message;
    private boolean success;

    @Getter
    @Builder
    public static class WinnerInfo {
        private String winnerName;    // 이름
        private String address;       // 주소
        private String phone;         // 전화번호
        private int ranking;          // 등수
    }
}
