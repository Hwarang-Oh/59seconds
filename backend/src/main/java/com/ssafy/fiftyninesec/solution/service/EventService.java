package com.ssafy.fiftyninesec.solution.service;

import com.ssafy.fiftyninesec.solution.dto.EventRoomRequestDto;
import com.ssafy.fiftyninesec.solution.dto.RoomUnlockResponse;
import com.ssafy.fiftyninesec.solution.entity.EventRoom;
import com.ssafy.fiftyninesec.solution.entity.EventStatus;
import com.ssafy.fiftyninesec.solution.entity.Prize;
import com.ssafy.fiftyninesec.solution.exception.RoomNotFoundException;
import com.ssafy.fiftyninesec.solution.repository.EventRoomRepository;
import com.ssafy.fiftyninesec.solution.repository.PrizeRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class EventService {

    private final EventRoomRepository eventRoomRepository;
    private final PrizeRepository prizeRepository;

    @Transactional
    public void createEventRoom(EventRoomRequestDto request) {
        EventRoom eventRoom = EventRoom.builder()
                .title(request.getEventInfo().getTitle())
                .description(request.getEventInfo().getDescription())
                .status(EventStatus.NOT_STARTED)
                .startTime(request.getEventPeriod().getStart()) // 이벤트 시작 시간 설정
                .endTime(request.getEventPeriod().getEnd())     // 이벤트 종료 시간 설정
                .winnerNum(request.getProductsOrCoupons().size())
                .enterCode(request.getParticipationCode())
                .bannerImage(request.getEventInfo().getBackgroundImage())
                .createdAt(LocalDateTime.now()) // 생성 시간 설정
                .build();

        eventRoomRepository.save(eventRoom);

        request.getProductsOrCoupons().forEach(product -> {
            Prize prize = Prize.builder()
                    .roomId(eventRoom.getRoomId())
                    .prizeType(product.getType())
                    .prizeName(product.getName())
                    .winnerCount(Optional.ofNullable(product.getRecommendedPeople()).orElse(0)) // 추천 인원 수 처리
                    .build();
            prizeRepository.save(prize);
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
}
