package com.ssafy.fiftyninesec.solution.service;

import com.ssafy.fiftyninesec.global.exception.CustomException;
import com.ssafy.fiftyninesec.search.repository.EventRoomSearchRepository;
import com.ssafy.fiftyninesec.search.service.SearchService;
import com.ssafy.fiftyninesec.solution.client.dto.UpdateEventStatusRequest;
import com.ssafy.fiftyninesec.solution.dto.PrizeDto;
import com.ssafy.fiftyninesec.solution.dto.WinnerInfoDto;
import com.ssafy.fiftyninesec.solution.dto.request.EventRoomRequestDto;
import com.ssafy.fiftyninesec.global.util.MinioUtil;
import com.ssafy.fiftyninesec.solution.dto.response.*;
import com.ssafy.fiftyninesec.solution.dto.request.WinnerRequestDto;
import com.ssafy.fiftyninesec.solution.entity.*;
import com.ssafy.fiftyninesec.solution.repository.EventRoomRepository;
import com.ssafy.fiftyninesec.solution.repository.MemberRepository;
import com.ssafy.fiftyninesec.solution.repository.PrizeRepository;
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
    private final EventRoomSearchRepository eventRoomSearchRepository;
    private final SearchService searchService;

    @Transactional
    public long createEventRoom(EventRoomRequestDto eventRoomRequestDto,
                                MultipartFile bannerImage,
                                MultipartFile rectangleImage
    ) {
        log.info("Received EventRoomRequestDto: {}", eventRoomRequestDto);
        log.info("Banner Image: {}", bannerImage.getOriginalFilename());
        log.info("Rectangle Image: {}", rectangleImage.getOriginalFilename());

        Member member = memberRepository.findById(eventRoomRequestDto.getMemberId())
                .orElseThrow(()-> new CustomException(MEMBER_NOT_FOUND));

        // 당첨 인원 합계
        int winnerCnt = eventRoomRequestDto.getProductsOrCoupons().stream().
                map(EventRoomRequestDto.ProductOrCoupon::getOrder)
                .reduce(0, Integer::sum);

        EventRoom eventRoom = saveEventRoom(eventRoomRequestDto, member, winnerCnt);

        // 이미지 서버에 업로드
        String bannerUrl = uploadImageAndGetUrl(bannerImage, eventRoom.getId(), "banner");
        String rectangleUrl = uploadImageAndGetUrl(rectangleImage, eventRoom.getId(), "rectangle");
        updateEventRoomImages(eventRoom, bannerUrl, rectangleUrl);

        // Prize 추가
        savePrizes(eventRoomRequestDto.getProductsOrCoupons(), eventRoom);
        
        // elasticsearch에 동기화
        eventRoomSearchRepository.save(searchService.convertToES(eventRoom));

        return eventRoom.getId();
    }

    private String uploadImageAndGetUrl(MultipartFile image, Long eventId, String imageType) {
        String imagePath = minioUtil.generateFilePath(image.getOriginalFilename(), imageType);
        return minioUtil.uploadImage("event-image", eventId + "/" + imagePath, image);
    }

    private void updateEventRoomImages(EventRoom eventRoom, String bannerUrl, String rectangleUrl) {
        eventRoom.setBannerImage(bannerUrl);
        eventRoom.setRectangleImage(rectangleUrl);
        eventRoomRepository.save(eventRoom);
    }

    @Transactional
    public void updateEventRoom(EventRoomRequestDto eventRoomRequestDto) {

        EventRoom eventRoom = eventRoomRepository.findById(eventRoomRequestDto.getRoomId())
                .orElseThrow(() -> new CustomException(EVENT_NOT_FOUND));

        eventRoom.setTitle(eventRoomRequestDto.getEventInfo().getTitle());
        eventRoom.setDescription(eventRoomRequestDto.getEventInfo().getDescription());
        eventRoom.setBannerImage(eventRoomRequestDto.getEventInfo().getBannerImage());
        eventRoom.setRectangleImage(eventRoomRequestDto.getEventInfo().getRectImage());
        eventRoom.setEnterCode(eventRoomRequestDto.getParticipationCode());
        eventRoom.setStartTime(eventRoomRequestDto.getEventPeriod().getStart());
        eventRoom.setEndTime(eventRoomRequestDto.getEventPeriod().getEnd());

        savePrizes(eventRoomRequestDto.getProductsOrCoupons(), eventRoom);
        uploadImages(eventRoomRequestDto.getAttachments());

        eventRoomRepository.save(eventRoom);

        // Elasticsearch 동기화
        eventRoomSearchRepository.save(searchService.convertToES(eventRoom));

        log.info("Updated event room: {}", eventRoom);
    }

    private EventRoom saveEventRoom(EventRoomRequestDto eventRoomRequestDto, Member member, int winnerCnt) {

        EventRoom eventRoom = EventRoom.builder()
                .member(member)
                .title(eventRoomRequestDto.getEventInfo().getTitle())
                .description(eventRoomRequestDto.getEventInfo().getDescription())
                .status(EventStatus.ONGOING)
                .startTime(eventRoomRequestDto.getEventPeriod().getStart())
                .endTime(eventRoomRequestDto.getEventPeriod().getEnd())
                .enterCode(eventRoomRequestDto.getParticipationCode())
                .bannerImage(eventRoomRequestDto.getEventInfo().getBannerImage())
                .rectangleImage(eventRoomRequestDto.getEventInfo().getRectImage())
                .createdAt(LocalDateTime.now())
                .winnerNum(winnerCnt)
                .unlockCount(0)
                .build();

        return eventRoomRepository.save(eventRoom);
    }


    private void savePrizes(List<EventRoomRequestDto.ProductOrCoupon> productsOrCoupons, EventRoom eventroom) {
        log.info("Saving prizes - Input products/coupons size: {}", productsOrCoupons.size());

        productsOrCoupons.forEach(productOrCoupon -> {
            log.info("Processing product/coupon - type: {}, name: {}, order: {}, recommendedPeople: {}",
                    productOrCoupon.getType(),
                    productOrCoupon.getName(),
                    productOrCoupon.getOrder(),
                    productOrCoupon.getRecommendedPeople());

            Prize prize = Prize.builder()
                    .eventRoom(eventroom)
                    .prizeType(productOrCoupon.getType())
                    .prizeName(productOrCoupon.getName())
                    .ranking(productOrCoupon.getOrder())
                    .winnerCount(productOrCoupon.getRecommendedPeople())
                    .build();

            Prize savedPrize = prizeRepository.save(prize);
            log.info("Saved prize - id: {}, name: {}, type: {}, ranking: {}, winnerCount: {}",
                    savedPrize.getId(),
                    savedPrize.getPrizeName(),
                    savedPrize.getPrizeType(),
                    savedPrize.getRanking(),
                    savedPrize.getWinnerCount());
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
    public WinnerInfoListResponseDto getWinners(long roomId) {
        EventRoom eventRoom = eventRoomRepository.findById(roomId)
                .orElseThrow(() -> new CustomException(EVENT_NOT_FOUND));

        List<Winner> winners = winnerRepository.findByRoom_IdOrderByRanking(roomId);
        if (winners.isEmpty()) {
            return WinnerInfoListResponseDto.of(Collections.emptyList());
        }

        List<WinnerInfoDto> winnerInfos = winners.stream()
                .map(winner -> WinnerInfoDto.of(
                        winner.getWinnerName(),
                        winner.getAddress(),
                        getPrizeByRanking(eventRoom, winner.getRanking()),
                        winner.getPhone(),
                        winner.getRanking()))
                .collect(Collectors.toList());

        return WinnerInfoListResponseDto.of(winnerInfos);
    }

    @Transactional(readOnly = true)
    public Page<PopularEventResponseDto> getPopularEvents(int page, int size) {
        log.info("인기 이벤트 조회 시작 - page: {}, size: {}", page, size);
        validatePageNumber(page, size);

        Page<EventRoom> eventRooms = eventRoomRepository.findAllByOrderByUnlockCountDesc(PageRequest.of(page, size));

        return eventRooms.map(eventRoom -> {
            String mainPrize = getPrizeByRanking(eventRoom, 1);
            int prizeCount = getPrizeCount(eventRoom.getId());
            int ranking = calculateRanking(eventRoom, eventRooms);

            return PopularEventResponseDto.of(eventRoom, mainPrize, prizeCount, ranking);
        });
    }

    @Transactional(readOnly = true)
    public List<DeadlineEventResponseDto> getDeadlineEvents(int size) {
        log.info("마감 임박 이벤트 조회 시작 - size: {}", size);

        LocalDateTime endDateTime = LocalDateTime.now(ZoneId.of("Asia/Seoul")).plusHours(24);
        List<EventRoom> events = eventRoomRepository.findDeadlineEventsByUpcoming(endDateTime, PageRequest.of(0, size));

        if (events.isEmpty()) {
            log.warn("마감 임박 이벤트가 없습니다");
            return Collections.emptyList();
    }
        log.info("마감 임박 이벤트 개수: {}", events.size());


        return events.stream()
                .map(eventRoom -> DeadlineEventResponseDto.of(
                        eventRoom,
                        getPrizeByRanking(eventRoom, 1), // 1등 상품명
                        getPrizeCount(eventRoom.getId())
                ))
                .collect(Collectors.toList());
    }

    @Transactional
    public void saveWinner(Long roomId, WinnerRequestDto requestDto) {
        log.info("당첨자 입력 정보: {}", requestDto.toString());
        log.info("이벤트룸 ID 조회 시작: {}", roomId);

        EventRoom room = eventRoomRepository.findById(roomId)
                .orElseThrow(() -> new CustomException(EVENT_NOT_FOUND));
        log.info("이벤트룸 조회 완료 - 이벤트명: {}, 상태: {}", room.getTitle(), room.getStatus());

        log.info("회원 ID 조회 시작: {}", requestDto.getMemberId());
        Member member = memberRepository.findById(requestDto.getMemberId())
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));
        log.info("당첨자 입력 정보: {}", requestDto.toString());

        Winner winner = Winner.builder()
                .room(room)
                .member(member)
                .winnerName(requestDto.getWinnerName())
                .address(requestDto.getAddress())
                .phone(requestDto.getPhone())
                .ranking(requestDto.getRanking())
                .build();

        winnerRepository.save(winner);

        // 이벤트 방 번호로 winner를 조회했을 때, event.winnerCount(당첨인원)와 같으면 모든 사용자 입력
        checkAndUpdateEventCompletion(room);
    }

    public EventRoomResponseDto getEventRoomInfo(Long roomId) {
        EventRoom event = eventRoomRepository.findById(roomId)
                .orElseThrow(() -> new CustomException(EVENT_NOT_FOUND));

        Member member = event.getMember();
        MemberResponseDto memberResponseDto = MemberResponseDto.of(member);

        List<Prize> prizes = prizeRepository.findByEventRoom_Id(roomId);
        List<PrizeDto> prizeDtos = prizes.stream()
                .map(PrizeDto::of)
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
                .memberResponseDto(memberResponseDto)
                .build();

        return responseDto;
    }

    public String getLatestBanner(long memberId) {
        // 사용자가 이벤트를 한 번도 생성하지 않은 경우는 에러가 아니다.
        EventRoom latestEventRoom = eventRoomRepository.findLatestEventByMemberId(memberId)
                .orElse(null);

        if (latestEventRoom != null) {
            return latestEventRoom.getBannerImage();
        } else {
            log.warn("최신 배너가 없습니다. memberId: {}", memberId);
            return minioUtil.DefaultBannerUrl;
        }
    }


    public void updateEventStatus(long roomId, EventStatus status) {
        EventRoom event = eventRoomRepository.findById(roomId)
                .orElseThrow(() -> new CustomException(EVENT_NOT_FOUND));
        log.info("{}번 방 상태 변경 요청: {}", roomId, status);
        event.setStatus(status);
        eventRoomRepository.save(event);
        log.info("{}번 방 상태 변경 완료", roomId);
    }

    // -----------------------------------------------

    private void validatePageNumber(int page, int size) {
        long totalEvents = eventRoomRepository.count();
        if (page > (totalEvents / size) + 1) {
            log.warn("유효하지 않은 페이지 요청 - page: {}, totalEvents: {}", page, totalEvents);
            throw new CustomException(INVALID_REQUEST);
        }
    }

    public String getPrizeByRanking(EventRoom eventRoom, int ranking) {
        return prizeRepository.findFirstByEventRoomAndRanking(eventRoom, ranking)
                .map(Prize::getPrizeName)
                .orElse(null);
    }

    public int getPrizeCount(Long eventRoomId) {
        return prizeRepository.countByEventRoom_Id(eventRoomId);
    }

    private int calculateRanking(EventRoom eventRoom, Page<EventRoom> eventRooms) {
        return (int) (eventRooms.getNumber() * eventRooms.getSize() +
                eventRooms.getContent().indexOf(eventRoom) + 1);
    }

    private void checkAndUpdateEventCompletion(EventRoom room) {
        long winnerCount = winnerRepository.countByRoomId(room.getId());
        if (winnerCount == room.getWinnerNum()) {
            updateEventStatus(room.getId(), EventStatus.COMPLETED);
        }
    }

    // TEST ------------------------------------------
    public void testMinio(Integer eventId, MultipartFile file) {
        String originalFilename = file.getOriginalFilename(); // 원본 파일 이름
        String extension = originalFilename != null && originalFilename.contains(".")
                ? originalFilename.substring(originalFilename.lastIndexOf("."))
                : ""; // 확장자 추출

        String fullPath = String.format("%d/banner%s", eventId, extension); // 파일 이름 변경
        minioUtil.uploadImage("event-image", fullPath, file);
        log.info("File name: {}", fullPath);
    }

}