package com.ssafy.fiftyninesec.participation.controller;

import com.ssafy.fiftyninesec.participation.dto.ParticipationRequestDto;
import com.ssafy.fiftyninesec.participation.dto.ParticipationResponseDto;
import com.ssafy.fiftyninesec.participation.entity.Participation;
import com.ssafy.fiftyninesec.participation.service.ParticipationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
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
    public List<ParticipationResponseDto> getParticipationsByRoomId(@PathVariable Long roomId) {
        return participationService.getParticipationsByRoomId(roomId);
    }

    // 새로운 참여자 생성 API
    @PostMapping
    public ResponseEntity<ParticipationResponseDto> createParticipation(@Valid @RequestBody ParticipationRequestDto request) {
        return ResponseEntity.ok(participationService.saveParticipation(request.getRoomId(), request.getMemberId()));
    }
}
