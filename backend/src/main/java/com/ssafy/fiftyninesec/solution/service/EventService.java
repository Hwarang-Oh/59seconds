package com.ssafy.fiftyninesec.solution.service;

import com.ssafy.fiftyninesec.solution.dto.EventRoomRequestDto;
import com.ssafy.fiftyninesec.solution.entity.EventRoom;
import com.ssafy.fiftyninesec.solution.entity.EventStatus;
import com.ssafy.fiftyninesec.solution.entity.Prize;
import com.ssafy.fiftyninesec.solution.repository.EventRoomRepository;
import com.ssafy.fiftyninesec.solution.repository.PrizeRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRoomRepository eventRoomRepository;
    private final PrizeRepository prizeRepository;

    @Transactional
    public void createEventRoom(EventRoomRequestDto request) {

        EventRoom eventRoom = EventRoom.builder()
                .title(request.getEventInfo().getTitle())
                .description(request.getEventInfo().getDescription())
                .status(EventStatus.NOT_STARTED)
                .eventTime(request.getEventPeriod().getStart())
                .winnerNum(request.getProductsOrCoupons().size())
                .enterCode(request.getParticipationCode())
                .bannerImage(request.getEventInfo().getBackgroundImage())
                .build();

        eventRoomRepository.save(eventRoom);

        request.getProductsOrCoupons().forEach(product -> {
            Prize prize = Prize.builder()
                    .roomId(eventRoom.getRoomId())
                    .prizeType(product.getType())
                    .prizeName(product.getName())
                    .winnerCount(product.getRecommendedPeople())
                    .build();
            prizeRepository.save(prize);
        });
    }
}