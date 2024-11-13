package com.ssafy.fiftyninesec.solution.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "member")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Cacheable
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @Setter
    @Column(name = "participate_name", length = 50, nullable = false)
    private String participateName;

    @Setter
    @Column(name = "creator_name", length = 50)
    private String creatorName;

    @Column(name = "kakao_sub", length = 255, nullable = false)
    private String kakaoSub;

    @Column(name = "join_date", nullable = false)
    private LocalDateTime joinDate;

    @Setter
    @Column(name = "address", length = 255)
    private String address;

    @Setter
    @Column(name = "phone", length = 255)
    private String phone;

    @Setter
    @Column(name = "profile_image", length = 100)
    private String profileImage;

    @Setter
    @Lob
    @Column(name = "creator_introduce")
    private String creatorIntroduce;

    @Setter
    @Column(name = "sns_link", length = 255)
    private String snsLink;

    @Builder
    public Member(String participateName, String creatorName, String kakaoSub,
                  String address, String phone,
                  String profileImage, String creatorIntroduce, String snsLink) {
        this.participateName = participateName;
        this.creatorName = creatorName;
        this.kakaoSub = kakaoSub;
        this.joinDate = LocalDateTime.now();
        this.address = address;
        this.phone = phone;
        this.profileImage = profileImage;
        this.creatorIntroduce = creatorIntroduce;
        this.snsLink = snsLink;
    }

}
