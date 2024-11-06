package com.ssafy.fiftyninesec.solution.service;

import com.ssafy.fiftyninesec.global.exception.CustomException;
import com.ssafy.fiftyninesec.solution.dto.PrizeDto;
import com.ssafy.fiftyninesec.solution.dto.request.EventRoomRequestDto;
import com.ssafy.fiftyninesec.global.util.MinioUtil;
import com.ssafy.fiftyninesec.solution.dto.RoomUnlockResponse;
import com.ssafy.fiftyninesec.solution.dto.WinnerRequestDto;
import com.ssafy.fiftyninesec.solution.dto.WinnerResponseDto;
import com.ssafy.fiftyninesec.solution.dto.response.EventRoomResponseDto;
import com.ssafy.fiftyninesec.solution.entity.*;
import com.ssafy.fiftyninesec.solution.repository.EventRoomRepository;
import com.ssafy.fiftyninesec.solution.repository.MemberRepository;
import com.ssafy.fiftyninesec.solution.repository.PrizeRepository;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import com.ssafy.fiftyninesec.solution.repository.WinnerRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.time.ZoneId;
import java.util.stream.Collectors;

import static com.ssafy.fiftyninesec.global.exception.ErrorCode.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRoomRepository eventRoomRepository;
    private final PrizeRepository prizeRepository;
    private final WinnerRepository winnerRepository;
    private final MemberRepository memberRepository;

    private final MinioUtil minioUtil;

    @Transactional
    public void createEvent(EventRoomRequestDto eventRoomRequestDto) {
        EventRoom eventRoom = saveEventRoomInfo(eventRoomRequestDto);
        savePrizes(eventRoomRequestDto.getProductsOrCoupons(), eventRoom);
        uploadImages(eventRoomRequestDto.getAttachments());
    }

    private EventRoom saveEventRoomInfo(EventRoomRequestDto eventRoomRequestDto) {
        EventRoomRequestDto.EventDetails eventInfo = eventRoomRequestDto.getEventInfo();
        EventRoomRequestDto.EventPeriod eventPeriod = eventRoomRequestDto.getEventPeriod();

        EventRoom eventRoom = EventRoom.builder()
                .title(eventInfo.getTitle())
                .description(eventInfo.getDescription())
                .startTime(eventPeriod.getStart())
                .endTime(eventPeriod.getEnd())
                .enterCode(eventRoomRequestDto.getParticipationCode())
                .bannerImage(eventInfo.getBannerImage())
                .rectangleImage(eventInfo.getRectImage())
                .status(EventStatus.NOT_STARTED)  // NOTE: 이벤트 시작 상태
                .createdAt(LocalDateTime.now())
                .build();

        return eventRoomRepository.save(eventRoom);
    }

    private void savePrizes(List<EventRoomRequestDto.ProductOrCoupon> productsOrCoupons, EventRoom eventroom) {
        productsOrCoupons.forEach(productOrCoupon -> {
            Prize prize = Prize.builder()
                    .eventRoom(eventroom)
                    .prizeType(productOrCoupon.getType())
                    .prizeName(productOrCoupon.getName())
                    .ranking(productOrCoupon.getOrder())
                    .winnerCount(productOrCoupon.getRecommendedPeople())
                    .build();

            prizeRepository.save(prize);
            log.info("Saved prize: {}", prize);
        });
    }

    private void uploadImages(List<MultipartFile> attachments) {
        if (attachments == null || attachments.isEmpty()) {
            log.info("No attachments to upload.");
            return;
        }

        attachments.forEach(file -> {
            try {
                String filename = file.getOriginalFilename();
                minioUtil.uploadImage("event-image", filename, file);
                log.info("File uploaded successfully: {}", filename);
            } catch (Exception e) {
                log.error("Failed to upload file: {}", file.getOriginalFilename(), e);
            }
        });
    }

    @Transactional
    public RoomUnlockResponse unlockRoom(Long roomId, String enterCode) {
        try {
            EventRoom room = eventRoomRepository.findById(roomId)
                    .orElseThrow(() -> new CustomException(EVENT_NOT_FOUND));

            // null 체크 추가
            String savedEnterCode = room.getEnterCode();
            if (savedEnterCode == null || !savedEnterCode.equals(enterCode)) {
                return RoomUnlockResponse.builder()
                        .success(false)
                        .message("암호가 일치하지 않습니다.")
                        .build();
            }

            // 잠금해제 수 증가
            room.increaseUnlockCount();
            eventRoomRepository.save(room);

            return RoomUnlockResponse.builder()
                    .success(true)
                    .message("암호가 성공적으로 풀렸습니다.")
                    .build();
        } catch (Exception e) {
            log.error("Error while unlocking room: ", e);
            return RoomUnlockResponse.builder()
                    .success(false)
                    .message("서버 오류가 발생했습니다.")
                    .build();
        }
    }

    @Transactional(readOnly = true)
    public WinnerResponseDto getWinners(Long roomId) {
        List<Winner> winners = winnerRepository.findByRoom_RoomIdOrderByRanking(roomId);

        if (winners.isEmpty()) {
            return WinnerResponseDto.builder()
                    .winners(Collections.emptyList())
                    .message("해당 방의 당첨자가 없습니다.")
                    .success(true)
                    .build();
        }

        List<WinnerResponseDto.WinnerInfo> winnerInfos = winners.stream()
                .map(winner -> WinnerResponseDto.WinnerInfo.builder()
                        .winnerName(winner.getWinnerName())
                        .address(winner.getAddress())
                        .phone(winner.getPhone())
                        .ranking(winner.getRanking())
                        .build())
                .collect(Collectors.toList());

        return WinnerResponseDto.builder()
                .winners(winnerInfos)
                .message("당첨자 목록을 성공적으로 조회했습니다.")
                .success(true)
                .build();
    }

    @Transactional(readOnly = true)
    public Page<EventRoom> getPopularEvents(int page, int size) {
        try {
            log.info("Getting popular events for page: {}, size: {}", page, size);
            // 페이지네이션 제한
            long totalEvents = eventRoomRepository.count();
            if (page > (totalEvents / size) + 1) {
                log.warn("Invalid page number requested: page {}, total events {}", page, totalEvents);
                throw new CustomException(INVALID_REQUEST);
            }

            return eventRoomRepository.findAllByOrderByUnlockCountDesc(PageRequest.of(page, size));

        } catch (Exception e) {
            log.error("Exception while getting popular events: {}", e.getMessage());
            throw e;
        }
    }

    @Transactional(readOnly = true)
    public List<EventRoom> getDeadlineEvents(int size) {
        try {
            log.info("Getting deadline events with size: {}", size);

        // 한국 시간(KST)으로 현재 시간으로부터 24시간 후의 시간 계산
        ZoneId koreaZoneId = ZoneId.of("Asia/Seoul");
        LocalDateTime endDateTime = LocalDateTime.now(koreaZoneId).plusHours(24);

            List<EventRoom> events = eventRoomRepository.findDeadlineEventsByUpcoming(
                    endDateTime,
                    PageRequest.of(0, size)
            );

            if (events.isEmpty()) {
                throw new CustomException(NO_DEADLINE_EVENTS_FOUND);
            }

            log.info("Found {} deadline events", events.size());
            return events;

        } catch (Exception e) {
            log.error("Unexpected error while getting deadline events: ", e);
            throw new CustomException(EVENT_NOT_FOUND);
        }
    }

    @Transactional
    public void saveWinner(Long roomId, WinnerRequestDto requestDto) {
        EventRoom room = eventRoomRepository.findById(roomId)
                .orElseThrow(() -> new CustomException(EVENT_NOT_FOUND));

        Member member = memberRepository.findById(requestDto.getMemberId())
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        Winner winner = Winner.builder()
                .room(room)
                .member(member)
                .winnerName(requestDto.getWinnerName())
                .address(requestDto.getAddress())
                .phone(requestDto.getPhone())
                .ranking(requestDto.getRanking())
                .build();

        winnerRepository.save(winner);
    }

    public EventRoomResponseDto getEventRoomInfo(Long roomId) {
        EventRoom event = eventRoomRepository.findById(roomId)
                .orElseThrow(() -> new CustomException(EVENT_NOT_FOUND));

        List<Prize> prizes = prizeRepository.findByEventRoom_RoomId(roomId);
        List<PrizeDto> prizeDtos = prizes.stream()
                .map(prize -> PrizeDto.builder()
                        .prizeId(prize.getPrizeId())
                        .prizeType(prize.getPrizeType())
                        .winnerCount(prize.getWinnerCount())
                        .prizeName(prize.getPrizeName())
                        .ranking(prize.getRanking())
                        .build()
                )
                .collect(Collectors.toList());

        EventRoomResponseDto responseDto = EventRoomResponseDto.builder()
                .title(event.getTitle())
                .description(event.getDescription())
                .status(String.valueOf(event.getStatus()))
                .startTime(event.getStartTime())
                .endTime(event.getEndTime())
                .winnerNum(event.getWinnerNum())
                .enterCode(event.getEnterCode())
                .unlockCount(event.getUnlockCount())
                .bannerImage(event.getBannerImage())
                .squareImage(event.getSquareImage())
                .rectangleImage(event.getRectangleImage())
                .createdAt(event.getCreatedAt())
                .prizes(prizeDtos)
                .build();

        return responseDto;
    }

    public String getLatestBanner(Long memberId) {
        try {
            EventRoom latestEventRoom = eventRoomRepository.findLatestEventByMemberId(memberId)
                    .orElseThrow(() -> new CustomException(EVENT_NOT_FOUND));
            return String.format("/%d/banner.jpg", latestEventRoom.getRoomId());
        } catch (Exception e) {
            log.error("Error while getting latest event banner: ", e);
            throw new CustomException(IMAGE_NOT_FOUND);
        }
    }

    // TEST ------------------------------------------

    public String testMinio(Integer eventId, MultipartFile file) {
        try {
            String originalFilename = file.getOriginalFilename(); // 원본 파일 이름
            String extension = originalFilename != null && originalFilename.contains(".")
                    ? originalFilename.substring(originalFilename.lastIndexOf("."))
                    : ""; // 확장자 추출

            // 파일 경로와 객체 이름 설정
            String fullPath = String.format("%d/banner%s", eventId, extension); // 파일 이름 변경

            // MinIO에 파일 업로드
            minioUtil.uploadImage("event-image", fullPath, file);
            log.info("File name: {}", fullPath);

            return "File uploaded successfully: " + fullPath;
        } catch (Exception e) {
            return "Failed to upload file: " + e.getMessage();
        }
    }

}