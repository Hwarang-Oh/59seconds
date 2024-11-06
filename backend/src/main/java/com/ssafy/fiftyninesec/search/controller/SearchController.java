package com.ssafy.fiftyninesec.search.controller;

import com.ssafy.fiftyninesec.search.dto.EventRoomSearchRequestDto;
import com.ssafy.fiftyninesec.search.dto.EventRoomSearchResponseDto;
import com.ssafy.fiftyninesec.search.entity.EventRoomSearch;
import com.ssafy.fiftyninesec.search.service.LogService;
import com.ssafy.fiftyninesec.search.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/search")
public class SearchController {

    private final SearchService searchService;
    private final LogService logService;

    @GetMapping("/eventrooms")
    public ResponseEntity<List<EventRoomSearchResponseDto>> searchEventRooms(@ModelAttribute EventRoomSearchRequestDto requestDto) {
        logService.logSearch(requestDto.getKeyword(), requestDto.getMemberId()); // 검색 로그 기록

        List<EventRoomSearchResponseDto> responseDtos = searchService.searchEventRooms(requestDto);

        if (responseDtos.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 No Content 반환
        }

        return ResponseEntity.ok(responseDtos); // 검색 결과 반환
    }

}
