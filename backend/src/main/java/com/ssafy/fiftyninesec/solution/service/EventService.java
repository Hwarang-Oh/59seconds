package com.ssafy.fiftyninesec.solution.service;

import com.ssafy.fiftyninesec.solution.dto.EventRoomRequestDto;
import com.ssafy.fiftyninesec.solution.dto.RoomUnlockResponse;
import com.ssafy.fiftyninesec.solution.entity.EventRoom;
import com.ssafy.fiftyninesec.solution.entity.EventStatus;
import com.ssafy.fiftyninesec.solution.entity.Prize;
import com.ssafy.fiftyninesec.solution.exception.RoomNotFoundException;
import com.ssafy.fiftyninesec.solution.repository.EventRoomRepository;
import com.ssafy.fiftyninesec.solution.repository.PrizeRepository;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.errors.MinioException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRoomRepository eventRoomRepository;
    private final PrizeRepository prizeRepository;
    private final MinioClient minioClient;

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
                log.info("Uploading file: {}", file.getOriginalFilename());
                InputStream fileInputStream = file.getInputStream();

                // MinIO에 파일 업로드
                minioClient.putObject(
                        PutObjectArgs.builder()
                                .bucket("test-bucket") // 사용할 버킷 이름
                                .object(file.getOriginalFilename()) // 저장할 객체 이름
                                .stream(fileInputStream, file.getSize(), -1)
                                .contentType(file.getContentType())
                                .build()
                );

                log.info("File uploaded successfully: {}", file.getOriginalFilename());
            } catch (Exception e) {
                log.error("Failed to upload file: {}", file.getOriginalFilename(), e);
            }
        });
    }

    @Transactional
    public RoomUnlockResponse unlockRoom(Long roomId, String enterCode) {
        try {
            EventRoom room = eventRoomRepository.findById(roomId)
                    .orElseThrow(() -> new RoomNotFoundException("Room not found with id: " + roomId));

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

    public String testMinio(MultipartFile file) {
        try {
            String bucketName = "test-bucket"; // 사용할 버킷 이름
            String objectName = file.getOriginalFilename(); // 저장할 객체 이름

            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(bucketName)
                            .object(objectName)
                            .stream(file.getInputStream(), file.getSize(), -1)
                            .contentType(file.getContentType())
                            .build()
            );
            return "File uploaded successfully: " + objectName;
        } catch (Exception e) {
            return "Failed to upload file: " + e.getMessage();
        }
    }
}
