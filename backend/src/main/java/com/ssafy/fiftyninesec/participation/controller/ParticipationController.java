package com.ssafy.fiftyninesec.participation.controller;

import com.ssafy.fiftyninesec.participation.dto.ParticipationRequestDto;
import com.ssafy.fiftyninesec.participation.dto.ParticipationResponseDto;
import com.ssafy.fiftyninesec.participation.entity.Participation;
import com.ssafy.fiftyninesec.participation.service.ParticipationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
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

    // 특정 roomId에 대한 ranking 초기화
    @PostMapping("/reset-ranking/{roomId}")
    public ResponseEntity<String> resetRanking(@PathVariable Long roomId) {
        participationService.deleteEventRanking(roomId);
        return ResponseEntity.ok("Ranking for roomId " + roomId + " has been reset to start from 1.");
    }
}
