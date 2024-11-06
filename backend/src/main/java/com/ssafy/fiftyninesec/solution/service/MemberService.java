package com.ssafy.fiftyninesec.solution.service;

import com.ssafy.fiftyninesec.global.exception.CustomException;
import com.ssafy.fiftyninesec.global.exception.ErrorCode;
import com.ssafy.fiftyninesec.solution.dto.MemberResponseDto;
import com.ssafy.fiftyninesec.solution.entity.Member;
import com.ssafy.fiftyninesec.solution.repository.MemberRepository;
import com.ssafy.fiftyninesec.solution.repository.RandomNicknameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final RandomNicknameRepository randomNicknameRepository;

    @Value("${random-nickname.size}")
    private int randomNicknameSize;

    @Transactional(readOnly = true)
    public MemberResponseDto getMemberInfo(Long memberId) {
        if (memberId == null) {
            throw new RuntimeException("memberId가 없습니다.");
        }
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("회원 정보를 찾을 수 없습니다. ID: " + memberId));

        return MemberResponseDto.of(member);
    }

    public Member registerMember(String kakaoSub) {
        String randomNickname = generateRandomNickname();

        Member newMember = Member.builder()
                .participateName(randomNickname) // 랜덤 닉네임 설정
                .creatorName(null)               // 선택 필드는 기본값으로 null 설정
                .kakaoSub(kakaoSub)              // 필수 파라미터로 전달된 카카오 고유 식별자 사용
                .address(null)
                .phone(null)
                .profileImage(null)
                .creatorIntroduce(null)
                .build();

        return memberRepository.save(newMember);
    }

    // 랜덤 닉네임 생성 로직
    private String generateRandomNickname() {
        Random random = new Random();
        int randomId = random.nextInt(randomNicknameSize);

        return randomNicknameRepository.findById((long) randomId)
                .orElseThrow(() -> new CustomException(ErrorCode.CANNOT_MAKE_RANDOM_NICKNAME))
                .getNickname();
    }
}
