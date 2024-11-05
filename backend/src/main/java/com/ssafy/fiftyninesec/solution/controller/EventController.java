package com.ssafy.fiftyninesec.solution.controller;

import com.ssafy.fiftyninesec.solution.dto.EventRoomRequestDto;
import com.ssafy.fiftyninesec.solution.dto.RoomUnlockRequest;
import com.ssafy.fiftyninesec.solution.dto.RoomUnlockResponse;
import com.ssafy.fiftyninesec.solution.service.EventService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    // TEST -----------------------------------------------------------------------------------------
    @PostMapping("/test/upload")
    public ResponseEntity<?> testMinio(@RequestParam("file") MultipartFile file) {
        eventService.testMinio(file);
        return ResponseEntity.ok().build();
    }
}
