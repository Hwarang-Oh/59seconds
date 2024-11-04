package com.ssafy.fiftyninesec.solution.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class EventRoomRequestDto {
    private EventInfo eventInfo;
    private List<ProductOrCoupon> productsOrCoupons;
    private EventPeriod eventPeriod;
    private String participationCode;

    @Data
    public static class EventInfo {
        private String title;
        private String description;
        private String backgroundImage;
    }

    @Data
    public static class ProductOrCoupon {
        private Integer order;
        private String type;
        private String name;
        private Integer recommendedPeople;
    }

    @Data
    public static class EventPeriod {
        private LocalDateTime start;
        private LocalDateTime end;
    }
}