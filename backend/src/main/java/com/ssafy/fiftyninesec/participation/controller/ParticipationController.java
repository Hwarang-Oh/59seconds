package com.ssafy.fiftyninesec.participation.controller;

import com.ssafy.fiftyninesec.participation.dto.ParticipationResponseDto;
import com.ssafy.fiftyninesec.participation.entity.Participation;
import com.ssafy.fiftyninesec.participation.service.ParticipationService;
import lombok.RequiredArgsConstructor;
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
    public ParticipationResponseDto createParticipation(@RequestBody Participation participation) {
        return participationService.saveParticipation(participation);
    }
}
