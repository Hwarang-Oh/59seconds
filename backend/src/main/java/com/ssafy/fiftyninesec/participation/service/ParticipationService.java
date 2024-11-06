package com.ssafy.fiftyninesec.participation.service;

import com.ssafy.fiftyninesec.global.exception.CustomException;
import com.ssafy.fiftyninesec.global.exception.ErrorCode;
import com.ssafy.fiftyninesec.participation.dto.ParticipationResponseDto;
import com.ssafy.fiftyninesec.participation.entity.Participation;
import com.ssafy.fiftyninesec.participation.repository.ParticipationRepository;
import com.ssafy.fiftyninesec.solution.entity.EventRoom;
import com.ssafy.fiftyninesec.solution.repository.EventRoomRepository;
import lombok.CustomLog;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.transaction.annotation.Transactional;

import static com.ssafy.fiftyninesec.global.exception.ErrorCode.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class ParticipationService {

    private final ParticipationRepository participationRepository;
    private final SimpMessagingTemplate messagingTemplate;
    private final EventRoomRepository eventRoomRepository;

    // 기존 참여자들을 조회
    @Transactional(readOnly = true)
    public List<ParticipationResponseDto> getParticipationsByRoomId(Long roomId) {
        List<Participation> participations = participationRepository.findByRoomIdOrderByRankingAsc(roomId)
                .orElseThrow(()-> new CustomException(PARTICIPATIONS_NOT_FOUND));

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
    @Transactional
    public ParticipationResponseDto saveParticipation(Long roomId, Long memberId) {
        // 1. 이벤트룸 조회
        EventRoom room = eventRoomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("Room not found with id: " + roomId));

        // 2. 이벤트 시작 시간 체크
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startTime = room.getStartTime();

        if (now.isBefore(startTime)) {
            throw new IllegalStateException("이벤트가 아직 시작되지 않았습니다.");
        }

        // 3. 이미 참여했는지 체크
        if (participationRepository.existsByRoomIdAndMemberId(roomId, memberId)) {
            throw new IllegalStateException("이미 참여한 이벤트입니다.");
        }

        // 4. 현재 참여자 수 확인
        int currentParticipants = participationRepository.countByRoomId(roomId);
//        if (currentParticipants >= room.getWinnerNum()) {
//            throw new IllegalStateException("선착순 마감되었습니다.");
//        }

        // 5. 참여 정보 생성
        Participation participation = Participation.builder()
                .roomId(roomId)
                .memberId(memberId)
                .joinedAt(now)
                .ranking(currentParticipants + 1)
                .isWinner(currentParticipants < room.getWinnerNum())
                .build();

        // 6. 저장 및 웹소켓 전송
        Participation savedParticipation = participationRepository.save(participation);
        ParticipationResponseDto responseDto = convertToDto(savedParticipation);

        // 웹소켓을 통해 새로운 참여자 정보를 전송
        messagingTemplate.convertAndSend("/result/sub/participations/" + roomId, responseDto);

        return responseDto;
    }
}