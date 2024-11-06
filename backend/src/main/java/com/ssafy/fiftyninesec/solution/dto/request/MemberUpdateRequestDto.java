package com.ssafy.fiftyninesec.solution.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberUpdateRequestDto {
    private String participateName;
    private String creatorName;
    private String address;
    private String phone;
    private String profileImage;
    private String creatorIntroduce;
    private String snsLink;
}