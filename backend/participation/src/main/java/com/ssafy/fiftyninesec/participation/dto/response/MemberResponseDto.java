package com.ssafy.fiftyninesec.participation.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberResponseDto {
    private String participateName;
    private String creatorName;
    private String address;
    private String phone;
    private String profileImage;
    private String creatorIntroduce;
    private String snsLink;
}