package com.ssafy.fiftyninesec.search.controller;

import com.ssafy.fiftyninesec.search.dto.EventRoomSearchRequestDto;
import com.ssafy.fiftyninesec.search.dto.EventRoomSearchResponseDto;
import com.ssafy.fiftyninesec.search.entity.EventRoomSearch;
import com.ssafy.fiftyninesec.search.service.LogService;
import com.ssafy.fiftyninesec.search.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/search")
public class SearchController {

    private final SearchService searchService;
    private final LogService logService;

    @GetMapping("/eventrooms")
    public List<EventRoomSearchResponseDto> searchEventRooms(@RequestParam String keyword) {
        logService.logSearch(keyword); // 검색 로그 기록
        EventRoomSearchRequestDto requestDto = new EventRoomSearchRequestDto();
        requestDto.setKeyword(keyword);
        return searchService.searchEventRooms(requestDto);
    }
}
