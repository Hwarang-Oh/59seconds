package com.ssafy.fiftyninesec.search.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.List;

@Data
@AllArgsConstructor
public class EventRoomSearchResponseWrapper {
    private List<EventRoomSearchResponseDto> results;
    private int currentPage;
    private boolean hasFirst;
    private boolean hasNext;
}
