package com.ssafy.fiftyninesec.solution.controller;

import com.ssafy.fiftyninesec.solution.dto.EventRoomRequestDto;
import com.ssafy.fiftyninesec.solution.dto.RoomUnlockRequest;
import com.ssafy.fiftyninesec.solution.dto.RoomUnlockResponse;
import com.ssafy.fiftyninesec.solution.dto.WinnerResponseDto;
import com.ssafy.fiftyninesec.solution.service.EventService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rooms")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    ResponseEntity<Void> createEventRoom(@RequestBody EventRoomRequestDto eventRoomRequestDto) {
        eventService.createEventRoom(eventRoomRequestDto);
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
}
