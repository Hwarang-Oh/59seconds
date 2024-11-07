package com.ssafy.fiftyninesec.solution.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "이벤트 룸 생성 요청 DTO")
public class EventRoomRequestDto {

    @Schema(description = "이벤트 룸 ID (업데이트 시에만 사용)", example = "1")
    private Long roomId;

    @Schema(description = "회원 ID (임시 변수)", example = "1")
    private Long memberId;

    @Schema(description = "이벤트 정보")
    private EventDetails eventInfo;

    @Schema(description = "상품 또는 쿠폰 목록")
    private List<ProductOrCoupon> productsOrCoupons;

    @Schema(description = "이벤트 기간 정보")
    private EventPeriod eventPeriod;

    @Schema(description = "참여 코드", example = "ABC123")
    private String participationCode;

    @Schema(description = "첨부 파일 목록")
    private List<MultipartFile> attachments;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @Schema(description = "이벤트 상세 정보")
    public static class EventDetails {
        @Schema(description = "이벤트 제목", example = "도경수가 뿌린다 이벤트")
        private String title;

        @Schema(description = "이벤트 설명", example = "구독자 500만명 달성을 기념하여 감사한 마음을 담아 상품을 준비했습니다.")
        private String description;

        @Schema(description = "배너 이미지 URL 또는 파일 이름", example = "banner.jpg")
        private String bannerImage;

        @Schema(description = "직사각형 이미지 URL 또는 파일 이름", example = "rectangle.jpg")
        private String rectImage;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @Schema(description = "상품 또는 쿠폰 정보")
    public static class ProductOrCoupon {
        @Schema(description = "상품 또는 쿠폰의 순서", example = "1")
        private int order;

        @Schema(description = "상품 또는 쿠폰의 유형", example = "상품")
        private String type;

        @Schema(description = "상품 또는 쿠폰의 이름", example = "맥북 에어")
        private String name;

        @Schema(description = "추천할 인원 수", example = "2")
        private int recommendedPeople;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @Schema(description = "이벤트 기간 정보")
    public static class EventPeriod {
        @Schema(description = "이벤트 시작 시간", example = "2024-11-04T14:30")
        private LocalDateTime start;

        @Schema(description = "이벤트 종료 시간", example = "2024-11-04T16:30")
        private LocalDateTime end;
    }
}
