package com.ssafy.fiftyninesec.participation.service;

import com.ssafy.fiftyninesec.participation.dto.ParticipationResponseDto;
import com.ssafy.fiftyninesec.participation.entity.Participation;
import com.ssafy.fiftyninesec.participation.repository.ParticipationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ParticipationService {

    private final ParticipationRepository participationRepository;
    private final SimpMessagingTemplate messagingTemplate;

    // 기존 참여자들을 조회
    public List<ParticipationResponseDto> getParticipationsByRoomId(Long roomId) {
        List<Participation> participations = participationRepository.findByRoomIdOrderByRankingAsc(roomId);
        return participations.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // 엔티티를 DTO로 변환하는 메서드
    private ParticipationResponseDto convertToDto(Participation participation) {
        return ParticipationResponseDto.builder()
                .participationId(participation.getParticipationId())
                .roomId(participation.getRoomId())
                .memberId(participation.getMemberId())
                .joinedAt(participation.getJoinedAt())
                .ranking(participation.getRanking())
                .isWinner(participation.getIsWinner())
                .build();
    }

    // 새로운 참여자를 저장하고 WebSocket으로 알림 전송
    public ParticipationResponseDto saveParticipation(Participation participation) {
        Participation savedParticipation = participationRepository.save(participation);
        ParticipationResponseDto participationResponseDto = convertToDto(savedParticipation);
        // WebSocket을 통해 새로운 참여자 정보를 전송
        messagingTemplate.convertAndSend("/result/sub/participations/" + participation.getRoomId(), participationResponseDto);
        return participationResponseDto;
    }
}