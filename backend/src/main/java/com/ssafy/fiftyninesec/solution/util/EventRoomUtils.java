package com.ssafy.fiftyninesec.solution.util;

import com.ssafy.fiftyninesec.search.entity.EventRoomSearch;
import com.ssafy.fiftyninesec.solution.entity.EventRoom;
import com.ssafy.fiftyninesec.solution.repository.PrizeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;
import com.ssafy.fiftyninesec.solution.entity.Prize;

@Component
@RequiredArgsConstructor
public class EventRoomUtils {

    private final PrizeRepository prizeRepository;

    public String getMainPrize(EventRoom eventRoom) {
        return prizeRepository.findFirstByEventRoomAndRanking(eventRoom, 1)
                .map(Prize::getPrizeName)
                .orElse(null);
    }

    public int getPrizeCount(Long eventRoomId) {
        return prizeRepository.countByEventRoom_Id(eventRoomId);
    }

    public int calculateRanking(EventRoomSearch eventRoomSearch, Page<EventRoomSearch> eventRoomsPage) {
        return (eventRoomsPage.getNumber() * eventRoomsPage.getSize() +
                eventRoomsPage.getContent().indexOf(eventRoomSearch) + 1);
    }
}
