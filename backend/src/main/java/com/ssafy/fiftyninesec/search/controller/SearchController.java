package com.ssafy.fiftyninesec.search.controller;

import com.ssafy.fiftyninesec.search.dto.EventRoomSearchRequestDto;
import com.ssafy.fiftyninesec.search.dto.EventRoomSearchResponseDto;
import com.ssafy.fiftyninesec.search.dto.EventRoomSearchResponseWrapper;
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
    public ResponseEntity<EventRoomSearchResponseWrapper> searchEventRooms(
            @ModelAttribute EventRoomSearchRequestDto requestDto,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        logService.logSearch(requestDto.getKeyword(), requestDto.getMemberId()); // 검색 로그 기록

        EventRoomSearchResponseWrapper responseWrapper = searchService.searchEventRooms(requestDto, page, size);

        // 응답 반환
        return ResponseEntity.ok(responseWrapper);
    }

    @GetMapping("/autocomplete")
    public ResponseEntity<List<String>> autocomplete(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        List<String> suggestions = searchService.autocomplete(keyword, page, size);
        return suggestions.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(suggestions);
    }
    @GetMapping("/synchronize")
    public ResponseEntity<Void> synchronize() {
        searchService.synchronizeData();
        return ResponseEntity.ok().build();
    }
}
