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
    private final RedisTemplate<String, String> redisTemplate;

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


    private static final String RANKING_KEY_PREFIX = "event:ranking:";

    // 특정 roomId에 대한 ranking 초기화
    @PostMapping("/reset-ranking/{roomId}")
    public ResponseEntity<String> resetRanking(@PathVariable Long roomId) {
        String rankingKey = RANKING_KEY_PREFIX + roomId;

        // Redis에서 해당 rankingKey 삭제
        redisTemplate.delete(rankingKey);

        return ResponseEntity.ok("Ranking for roomId " + roomId + " has been reset to start from 1.");
    }
}
