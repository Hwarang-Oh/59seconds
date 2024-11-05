package com.ssafy.fiftyninesec.solution.controller;

import com.ssafy.fiftyninesec.solution.dto.EventRoomRequestDto;
import com.ssafy.fiftyninesec.solution.dto.RoomUnlockRequest;
import com.ssafy.fiftyninesec.solution.dto.RoomUnlockResponse;
import com.ssafy.fiftyninesec.solution.dto.WinnerResponseDto;
import com.ssafy.fiftyninesec.solution.entity.EventRoom;
import com.ssafy.fiftyninesec.solution.service.EventService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.Page;

@RestController
@RequestMapping("/rooms")
public class EventController {

    EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;  // null이 아님을 보장
    }

    @PostMapping
    ResponseEntity<Void> createEvent(@RequestBody EventRoomRequestDto eventRoomRequestDto) {
        eventService.createEvent(eventRoomRequestDto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{roomId}/unlock")
    public ResponseEntity<RoomUnlockResponse> unlockRoom(
            @PathVariable Long roomId,
            @Valid @RequestBody RoomUnlockRequest request
    ) {
        return ResponseEntity.ok(eventService.unlockRoom(roomId, request.getEnterCode()));
    }

    @GetMapping("/{roomId}/winners")
    public ResponseEntity<WinnerResponseDto> getWinners(@PathVariable Long roomId) {
        return ResponseEntity.ok(eventService.getWinners(roomId));
    }

    @GetMapping("/popular")
    public ResponseEntity<Page<EventRoom>> getPopularRooms(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        Page<EventRoom> popularRooms = eventService.getPopularEvents(page, size);
        return ResponseEntity.ok(popularRooms);
    }

    // TEST -----------------------------------------------------------------------------------------
    @PostMapping("/test/upload")
    public ResponseEntity<?> testMinio(@RequestParam("file") MultipartFile file) {
        eventService.testMinio(file);
        return ResponseEntity.ok().build();
    }

}
