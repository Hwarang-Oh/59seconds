package com.ssafy.fiftyninesec.solution.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "member")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @Column(name = "participate_name", length = 50, nullable = false)
    private String participateName;

    @Column(name = "creator_name", length = 50)
    private String creatorName;

    @Column(name = "kakao_sub", length = 255, nullable = false)
    private String kakaoSub;

    @Column(name = "join_date", nullable = false)
    private LocalDateTime joinDate;

    @Column(name = "address", length = 255)
    private String address;

    @Column(name = "phone", length = 255)
    private String phone;

    @Column(name = "profile_image", length = 100)
    private String profileImage;

    @Lob
    @Column(name = "creator_introduce")
    private String creatorIntroduce;

    @Builder
    public Member(String participateName, String creatorName, String kakaoSub,
                  String address, String phone,
                  String profileImage, String creatorIntroduce) {
        this.participateName = participateName;
        this.creatorName = creatorName;
        this.kakaoSub = kakaoSub;
        this.joinDate = LocalDateTime.now();
        this.address = address;
        this.phone = phone;
        this.profileImage = profileImage;
        this.creatorIntroduce = creatorIntroduce;
    }
}
