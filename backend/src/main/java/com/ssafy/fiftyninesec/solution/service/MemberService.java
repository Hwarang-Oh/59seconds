package com.ssafy.fiftyninesec.solution.service;

import com.ssafy.fiftyninesec.global.exception.CustomException;
import com.ssafy.fiftyninesec.global.exception.ErrorCode;
import com.ssafy.fiftyninesec.global.util.MinioUtil;
import com.ssafy.fiftyninesec.participation.entity.Participation;
import com.ssafy.fiftyninesec.participation.repository.ParticipationRepository;
import com.ssafy.fiftyninesec.solution.dto.response.CreatedEventResponseDto;
import com.ssafy.fiftyninesec.solution.dto.response.MemberResponseDto;
import com.ssafy.fiftyninesec.solution.dto.request.MemberUpdateRequestDto;
import com.ssafy.fiftyninesec.solution.dto.response.ParticipatedEventResponseDto;
import com.ssafy.fiftyninesec.solution.entity.EventRoom;
import com.ssafy.fiftyninesec.solution.entity.Member;
import com.ssafy.fiftyninesec.solution.entity.Prize;
import com.ssafy.fiftyninesec.solution.repository.EventRoomRepository;
import com.ssafy.fiftyninesec.solution.repository.MemberRepository;
import com.ssafy.fiftyninesec.solution.repository.PrizeRepository;
import com.ssafy.fiftyninesec.solution.repository.RandomNicknameRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Sort;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
import java.util.stream.Collectors;

import static com.ssafy.fiftyninesec.global.exception.ErrorCode.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final RandomNicknameRepository randomNicknameRepository;
    private final EventRoomRepository eventRoomRepository;
    private final ParticipationRepository participationRepository;
    private final PrizeRepository prizeRepository;
    private final MinioUtil minioUtil;

    @Value("${random-nickname.size}")
    private int randomNicknameSize;

    @Transactional(readOnly = true)
    public MemberResponseDto getMemberInfo(Long memberId) {
        if (memberId == null) {
            throw new CustomException(MEMBER_NOT_FOUND);
        }
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));

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
                .snsLink(null)
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

    @Transactional
    public void updateField(Long memberId, String fieldName, String fieldValue) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));

        // 유효성 검사 및 필드 업데이트
        switch (fieldName) {
            case "creatorName":
                log.info("들어옴");
                validateCreatorName(fieldValue);
                member.setCreatorName(fieldValue);
                break;
            case "address":
                validateAddress(fieldValue);
                member.setAddress(fieldValue);
                break;
            case "phone":
                validatePhone(fieldValue);
                member.setPhone(fieldValue);
                break;
            case "profileImage":
                validateProfileImage(fieldValue);
                member.setProfileImage(fieldValue);
                break;
            case "creatorIntroduce":
                validateCreatorIntroduce(fieldValue);
                member.setCreatorIntroduce(fieldValue);
                break;
            case "snsLink":
                validateSnsLink(fieldValue);
                member.setSnsLink(fieldValue);
                break;
            default:
                throw new CustomException(ErrorCode.INVALID_FIELD_NAME);
        }

        memberRepository.save(member);
    }

    @Transactional
    public void updatePartialFields(Long memberId, MemberUpdateRequestDto updateDto) {
        // 회원 정보 조회
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));

        // 각 필드에 대해 유효성 검사 및 업데이트 수행
        if (updateDto.getCreatorName() != null) {
            validateCreatorName(updateDto.getCreatorName());
            member.setCreatorName(updateDto.getCreatorName());
        }

        if (updateDto.getAddress() != null) {
            validateAddress(updateDto.getAddress());
            member.setAddress(updateDto.getAddress());
        }

        if (updateDto.getPhone() != null) {
            validatePhone(updateDto.getPhone());
            member.setPhone(updateDto.getPhone());
        }

        // 프로필 이미지 파일이 있으면 MinIO에 업로드하고 URL 설정
        if (updateDto.getProfileImage() != null && !updateDto.getProfileImage().isEmpty()) {
            String bucketName = "profile-image";
            String fullPath = updateDto.getProfileImage().getOriginalFilename();
            String profileImageUrl = minioUtil.uploadImage(bucketName, fullPath, updateDto.getProfileImage());
            member.setProfileImage(profileImageUrl);
        }

        if (updateDto.getCreatorIntroduce() != null) {
            validateCreatorIntroduce(updateDto.getCreatorIntroduce());
            member.setCreatorIntroduce(updateDto.getCreatorIntroduce());
        }

        if (updateDto.getSnsLink() != null) {
            validateSnsLink(updateDto.getSnsLink());
            member.setSnsLink(updateDto.getSnsLink());
        }

        // 업데이트된 필드를 저장
        memberRepository.save(member);
    }


    private void validateCreatorName(String creatorName) {
        if (creatorName == null || creatorName.isBlank()) {
            throw new CustomException(ErrorCode.INVALID_CREATOR_NAME);
        }
        if (creatorName.length() > 50) {
            throw new CustomException(ErrorCode.INVALID_CREATOR_NAME);
        }
    }

    private void validateAddress(String address) {
        if (address != null && address.length() > 255) {
            throw new CustomException(ErrorCode.INVALID_ADDRESS);
        }
    }

    private void validatePhone(String phone) {
        if (phone != null && !phone.matches("\\d{3}-\\d{3,4}-\\d{4}")) {
            throw new CustomException(ErrorCode.INVALID_PHONE);
        }
    }

    private void validateProfileImage(String profileImage) {
        if (profileImage != null && profileImage.length() > 100) {
            throw new CustomException(ErrorCode.INVALID_PROFILE_IMAGE);
        }
    }

    private void validateCreatorIntroduce(String creatorIntroduce) {
        if (creatorIntroduce != null && creatorIntroduce.length() > 1000) {
            throw new CustomException(ErrorCode.INVALID_CREATOR_INTRODUCE);
        }
    }

    private void validateSnsLink(String snsLink) {
        if (snsLink != null && !snsLink.matches("^(https?|ftp)://[^\\s/$.?#].[^\\s]*$")) {
            throw new CustomException(ErrorCode.INVALID_SNS_LINK);
        }
    }

    public List<CreatedEventResponseDto> getCreatedEventRooms(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));

        // 생성일 내림차순
        Sort sort = Sort.by(Sort.Direction.DESC, "startTime");
        List<EventRoom> events = eventRoomRepository.findByMember(member, sort);

        return Optional.ofNullable(events)
                .filter(eventList -> !eventList.isEmpty())
                .map(eventList -> eventList.stream()
                        .map(CreatedEventResponseDto::new)
                        .collect(Collectors.toList()))
                .orElse(Collections.emptyList());
    }

    public List<ParticipatedEventResponseDto> getParticipatedEventRooms(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));

        List<Participation> participatedEvents = participationRepository.findByMemberId(memberId);
        if (participatedEvents.isEmpty()) {
            log.info("회원 ID {}: 참여한 이벤트가 없습니다.", memberId);
            return Collections.emptyList();
        }

        log.info("참여한 이벤트 수 : {}", participatedEvents.size());

        List<ParticipatedEventResponseDto> responseDtos = new ArrayList<>();

        for (Participation participation : participatedEvents) {

            // 이벤트 정보 조회
            EventRoom eventRoom = eventRoomRepository.findById(participation.getRoom().getId())
                    .orElseThrow(() -> {
                        log.error("회원 ID {}: 이벤트 ID {}를 찾을 수 없습니다.", memberId, participation.getRoom().getId());
                        return new CustomException(EVENT_NOT_FOUND);
                    });

            // 당첨된 경우에만 상품 정보 조회
            Prize prize = null;
            if (participation.getIsWinner()) {
                prize = prizeRepository.findByEventRoomAndRanking(eventRoom, participation.getRanking())
                        .orElseThrow(() -> {
                            log.error("회원 ID {}: 이벤트 ID {}에서 등수 {}에 해당하는 상품을 찾을 수 없습니다.",
                                    memberId, eventRoom.getId(), participation.getRanking());
                            return new CustomException(PRIZE_NOT_FOUND);
                        });
            }

            // DTO 생성 및 리스트에 추가
            ParticipatedEventResponseDto dto = ParticipatedEventResponseDto.builder()
                    .eventId(participation.getRoom().getId())
                    .ranking(participation.getRanking())
                    .isWinner(participation.getIsWinner())
                    .title(eventRoom.getTitle())
                    .bannerImage(eventRoom.getBannerImage())
                    .totalParticipants(eventRoom.getUnlockCount())
                    .prizeType(prize != null ? prize.getPrizeType() : null)
                    .prizeName(prize != null ? prize.getPrizeName() : null)
                    .startTime(eventRoom.getStartTime())
                    .build();

            responseDtos.add(dto);
        }

        return responseDtos;
    }
}
