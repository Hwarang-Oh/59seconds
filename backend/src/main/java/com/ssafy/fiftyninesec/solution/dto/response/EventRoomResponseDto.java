package com.ssafy.fiftyninesec.solution.dto.response;

import com.ssafy.fiftyninesec.solution.dto.PrizeDto;
import io.swagger.v3.oas.annotations.media.Schema;
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
@Schema(description = "이벤트 룸 응답 DTO")
public class EventRoomResponseDto {

    @Schema(description = "이벤트 룸의 생성자 정보", implementation = MemberResponseDto.class)
    private MemberResponseDto memberResponseDto;

    @Schema(description = "이벤트 제목", example = "임예원이 뿌린다 이벤트")
    private String title;

    @Schema(description = "이벤트 설명", example = "감사한 마음을 담아 사비로 상품을 준비했습니다.")
    private String description;

    @Schema(description = "이벤트 상태", example = "NOT_STARTED")
    private String status;

    @Schema(description = "이벤트 시작 시간", example = "2024-11-04T14:30")
    private LocalDateTime startTime;

    @Schema(description = "이벤트 종료 시간", example = "2024-11-04T16:30")
    private LocalDateTime endTime;

    @Schema(description = "우승자 수", example = "3")
    private int winnerNum;

    @Schema(description = "참여 코드", example = "ABC123")
    private String enterCode;

    @Schema(description = "잠금 해제 카운트", example = "5")
    private int unlockCount;

    @Schema(description = "배너 이미지 URL", example = "banner.jpg")
    private String bannerImage;

    @Schema(description = "정사각형 이미지 URL", example = "square.jpg")
    private String squareImage;

    @Schema(description = "직사각형 이미지 URL", example = "rectangle.jpg")
    private String rectangleImage;

    @Schema(description = "이벤트 생성 시간", example = "2024-11-01T10:00")
    private LocalDateTime createdAt;

    @Schema(description = "이벤트에 대한 상품 목록")
    private List<PrizeDto> prizes;
}
