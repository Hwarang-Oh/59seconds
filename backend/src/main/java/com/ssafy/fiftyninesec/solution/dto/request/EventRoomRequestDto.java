package com.ssafy.fiftyninesec.solution.dto.request;

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
public class EventRoomRequestDto {
    private EventDetails eventInfo;
    private List<ProductOrCoupon> productsOrCoupons;
    private EventPeriod eventPeriod;
    private String participationCode;
    private List<MultipartFile> attachments;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class EventDetails {
        private String title;
        private String description;
        private String bannerImage;
        private String rectImage;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProductOrCoupon {
        private int order;
        private String type;
        private String name;
        private int recommendedPeople;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class EventPeriod {
        private LocalDateTime start;
        private LocalDateTime end;
    }
}