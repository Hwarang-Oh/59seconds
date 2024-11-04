package com.ssafy.fiftyninesec.solution.dto;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberUpdateRequestDto {
    private String participateName;

    @Size(max = 50, message = "크리에이터 이름은 최대 50자까지 가능합니다.")
    private String creatorName;

    @Size(max = 255, message = "카카오 서브는 최대 255자까지 가능합니다.")
    private String kakaoSub;

    @Size(max = 255, message = "주소는 최대 255자까지 가능합니다.")
    private String address;

    @Size(max = 255, message = "전화번호는 최대 255자까지 가능합니다.")
    private String phone;

    @Size(max = 100, message = "프로필 이미지는 최대 100자까지 가능합니다.")
    private String profileImage;

    private String creatorIntroduce;
}