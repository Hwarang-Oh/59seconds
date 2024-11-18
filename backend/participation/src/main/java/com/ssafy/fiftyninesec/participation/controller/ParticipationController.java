package com.ssafy.fiftyninesec.participation.controller;

import com.ssafy.fiftyninesec.participation.client.dto.ParticipatedEventFeignResponseDto;
import com.ssafy.fiftyninesec.participation.dto.request.ParticipationRequestDto;
import com.ssafy.fiftyninesec.participation.dto.response.ParticipationResponseDto;
import com.ssafy.fiftyninesec.participation.service.ParticipationService;
import jakarta.validation.Valid;
import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/participations")
@RequiredArgsConstructor
public class ParticipationController {

    private final ParticipationService participationService;

    // 참여자 목록 조회 API
    @GetMapping("/{roomId}/result")
    public ResponseEntity<List<ParticipationResponseDto>> getParticipationsByRoomId(@PathVariable Long roomId) {
        List<ParticipationResponseDto> participations = participationService.getParticipationsByRoomId(roomId);
        return ResponseEntity.ok(participations);
    }

    // 새로운 참여자 생성 API
    @PostMapping
    public ResponseEntity<ParticipationResponseDto> createParticipation(@Valid @RequestBody ParticipationRequestDto request) {
        ParticipationResponseDto responseDto = participationService.saveParticipation(request.getEventId(), request.getMemberId());
        return ResponseEntity.ok(responseDto);
    }

    // 특정 memeberId가 참여한 내역 조회 API
    @GetMapping
    public ResponseEntity<List<ParticipatedEventFeignResponseDto>> getParticipationsByMemberId(
            @RequestParam long memberId
    ) {
        List<ParticipatedEventFeignResponseDto> responseDtos = participationService.getParticipationsByMemberId(memberId);
        return ResponseEntity.ok(responseDtos);
    }

    // 특정 roomId에 대한 ranking 초기화
    @PostMapping("/reset-ranking/{roomId}")
    public ResponseEntity<String> resetRanking(@PathVariable Long roomId) {
        participationService.deleteEventRanking(roomId);
        return ResponseEntity.ok("Ranking for roomId " + roomId + " has been reset to start from 1.");
    }

    // db 개입 없이 ws 테스트
    @PostMapping("/test")
    public ResponseEntity<ParticipationResponseDto> createParticipationTest(@Valid @RequestBody ParticipationRequestDto request){
        ParticipationResponseDto responseDto = participationService.saveParticipationTest(request.getEventId(), request.getMemberId());
        return ResponseEntity.ok(responseDto);
    }

    @PostMapping("/test/reset-counter")
    public ResponseEntity<String> resetTestCounter() {
        participationService.resetTestRanking();
        return ResponseEntity.ok("Test ranking counter has been reset.");
    }

    @PostMapping("/flushdb")
    public ResponseEntity<String> flushDatabase() {
        try {
            participationService.flushDatabase();
            return ResponseEntity.ok("Redis database has been flushed successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to flush Redis database. Error: " + e.getMessage());
        }
    }
}
