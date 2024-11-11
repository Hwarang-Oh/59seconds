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
    public ResponseEntity<List<EventRoomSearchResponseDto>> searchEventRooms(
            @ModelAttribute EventRoomSearchRequestDto requestDto,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        logService.logSearch(requestDto.getKeyword(), requestDto.getMemberId()); // 검색 로그 기록

        List<EventRoomSearchResponseDto> responseDtos = searchService.searchEventRooms(requestDto, page, size);

        if (responseDtos.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 No Content 반환
        }

        return ResponseEntity.ok(responseDtos); // 검색 결과 반환
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
