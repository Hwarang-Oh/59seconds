package com.ssafy.fiftyninesec.solution.service;

import com.ssafy.fiftyninesec.solution.dto.EventRoomRequestDto;
import com.ssafy.fiftyninesec.solution.entity.EventRoom;
import com.ssafy.fiftyninesec.solution.entity.EventStatus;
import com.ssafy.fiftyninesec.solution.entity.Prize;
import com.ssafy.fiftyninesec.solution.repository.EventRoomRepository;
import com.ssafy.fiftyninesec.solution.repository.PrizeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRoomRepository eventRoomRepository;
    private final PrizeRepository prizeRepository;

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
                // 예시: 파일 저장 로직 (구체적인 로직은 환경에 맞게 구현)
                log.info("Uploading file: {}", file.getOriginalFilename());
                // File storage code here
            } catch (Exception e) {
                log.error("Failed to upload file: {}", file.getOriginalFilename(), e);
            }
        });
    }

}
