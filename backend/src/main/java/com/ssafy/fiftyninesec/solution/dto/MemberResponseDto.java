package com.ssafy.fiftyninesec.solution.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MemberResponseDto {
    private Long id;
    private String participateName;
    private String creatorName;
    private String address;
    private String phone;
    private String profileImage;
    private String creatorIntroduce;

    @Builder
    public MemberResponseDto(Long id, String participateName, String creatorName,
                          String address, String phone, String profileImage,
                          String creatorIntroduce) {
        this.id = id;
        this.participateName = participateName;
        this.creatorName = creatorName;
        this.address = address;
        this.phone = phone;
        this.profileImage = profileImage;
        this.creatorIntroduce = creatorIntroduce;
    }
}
