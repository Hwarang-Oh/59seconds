package com.ssafy.fiftyninesec.solution.dto.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class MemberUpdateRequestDto {
    private String participateName;
    private String creatorName;
    private String address;
    private String phone;
    private String creatorIntroduce;
    private String snsLink;
}