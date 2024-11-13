package com.ssafy.fiftyninesec.participation.service;

import com.ssafy.fiftyninesec.global.exception.CustomException;
import com.ssafy.fiftyninesec.participation.dto.ParticipationResponseDto;
import com.ssafy.fiftyninesec.participation.entity.Participation;
import com.ssafy.fiftyninesec.participation.repository.ParticipationRepository;
import com.ssafy.fiftyninesec.solution.entity.EventRoom;
import com.ssafy.fiftyninesec.solution.entity.Member;
import com.ssafy.fiftyninesec.solution.repository.EventRoomRepository;
import com.ssafy.fiftyninesec.solution.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import static com.ssafy.fiftyninesec.global.exception.ErrorCode.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class ParticipationService {

    private final ParticipationRepository participationRepository;
    private final RedisTemplate<String, String> redisTemplate;
    private final RedissonClient redissonClient;
    private final SimpMessagingTemplate messagingTemplate;
    private final EventRoomRepository eventRoomRepository;
    private final MemberRepository memberRepository;

    private static final String RANKING_KEY_PREFIX = "event:ranking:";
    private static final String PARTICIPATION_LOCK_PREFIX = "event:lock:";
    private static final long LOCK_WAIT_TIME = 1000L; // 1초
    private static final long LOCK_LEASE_TIME = 500L; // 500ms
    private final AtomicLong rankingCounter = new AtomicLong(0);

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
                .eventId(participation.getRoom().getId())
                .memberId(participation.getMember().getId())
                .joinedAt(participation.getJoinedAt())
                .ranking(participation.getRanking())
                .isWinner(participation.getIsWinner())
                .winnerName(participation.getMember().getCreatorName())
                .build();
    }

    // 새로운 참여자를 저장하고 WebSocket으로 알림 전송
    @Transactional
    public ParticipationResponseDto saveParticipation(Long roomId, Long memberId) {
        // 1. Redis에서 사용할 키 생성
        String rankingKey = RANKING_KEY_PREFIX + roomId;
        String lockKey = PARTICIPATION_LOCK_PREFIX + roomId;

        // 2. Redisson 분산 락 획득
        RLock lock = redissonClient.getLock(lockKey);

        try {
            // 3. 락 획득 시도 (최대 1초 대기, 500ms 후 자동 해제)
            boolean isLocked = lock.tryLock(LOCK_WAIT_TIME, LOCK_LEASE_TIME, TimeUnit.MILLISECONDS);
            if (!isLocked) {
                throw new CustomException(LOCK_ACQUISITION_FAILED);
            }

            // 4. 기본 유효성 검사
            Member member = memberRepository.findById(memberId)
                    .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));

            EventRoom room = eventRoomRepository.findById(roomId)
                    .orElseThrow(() -> new CustomException(EVENT_NOT_FOUND));

            validateEventTiming(room);
            validateDuplicateParticipation(roomId, memberId);

            // 5. Redis Increment를 사용하여 순위 생성
            Long currentRanking = redisTemplate.opsForValue().increment(rankingKey);

            // 6. 참가자 정보 생성 및 저장
            Participation participation = Participation.builder()
                    .room(room)
                    .member(member)
                    .joinedAt(LocalDateTime.now())
                    .ranking(currentRanking.intValue())
                    .isWinner(currentRanking <= room.getWinnerNum())
                    .build();

            Participation savedParticipation = participationRepository.save(participation);

            // 7. WebSocket을 통한 실시간 알림
            ParticipationResponseDto responseDto = convertToDto(savedParticipation);
            messagingTemplate.convertAndSend("/result/sub/participations/" + roomId, responseDto);

            return responseDto;

        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new CustomException(LOCK_INTERRUPTED);
        } finally {
            // 8. 락 해제 (다른 스레드가 락을 획득한 경우에만)
            if (lock.isHeldByCurrentThread()) {
                lock.unlock();
            }
        }
    }
    private void validateEventTiming(EventRoom room) {
        LocalDateTime now = LocalDateTime.now();
        if (now.isBefore(room.getStartTime())) {
            throw new CustomException(EVENT_NOT_STARTED);
        }
    }

    private void validateDuplicateParticipation(Long roomId, Long memberId) {
        if (participationRepository.existsByRoomIdAndMemberId(roomId, memberId)) {
            throw new CustomException(ALREADY_PARTICIPATED);
        }
    }

    // db 개입 없이 ws 테스트
    // 새로운 참여자를 저장하고 WebSocket으로 알림 전송
    @Transactional
    public ParticipationResponseDto saveParticipationTest(Long roomId, Long memberId) {
        try {
            // 1. 순위 생성 (AtomicLong 사용)
            long currentRanking = rankingCounter.incrementAndGet();

            // 2. 더미 데이터로 응답 DTO 생성
            ParticipationResponseDto responseDto = ParticipationResponseDto.builder()
                    .eventId(roomId)
                    .memberId(memberId)
                    .joinedAt(LocalDateTime.now())
                    .ranking((int) currentRanking)
                    .isWinner(currentRanking <= 100) // 테스트용 당첨자 수 100으로 고정
                    .winnerName("Tester_" + memberId) // 테스트용 이름
                    .build();

            // 3. WebSocket으로 실시간 알림 전송
            messagingTemplate.convertAndSend("/result/sub/participations/" + roomId, responseDto);

            log.info("Test participation processed - Room: {}, Member: {}, Ranking: {}",
                    roomId, memberId, currentRanking);

            return responseDto;

        } catch (Exception e) {
            log.error("Error in test participation: ", e);
            throw new CustomException(PARTICIPATION_FAILED);
        }
    }

    // rankingCounter 초기화를 위한 메서드 추가
    public void resetTestRanking() {
        rankingCounter.set(0);
    }
}