package com.ssafy.fiftyninesec.participation.service;

import com.esotericsoftware.minlog.Log;
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
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import static com.ssafy.fiftyninesec.global.constants.RedisConstants.*;
import static com.ssafy.fiftyninesec.global.exception.ErrorCode.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class ParticipationService {

    private final ParticipationRepository participationRepository;
    private final RedisTemplate<String, Object> redisTemplate;
    private final RedissonClient redissonClient;
    private final SimpMessagingTemplate messagingTemplate;
    private final EventRoomRepository eventRoomRepository;
    private final MemberRepository memberRepository;
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
        String lockKey = PARTICIPATION_LOCK_PREFIX + roomId;
        RLock lock = redissonClient.getLock(lockKey);

        try {
            boolean isLocked = lock.tryLock(LOCK_WAIT_TIME, LOCK_LEASE_TIME, TimeUnit.MILLISECONDS);
            if (!isLocked) {
                throw new CustomException(LOCK_ACQUISITION_FAILED);
            }

            Member member = memberRepository.findById(memberId)
                    .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));
            EventRoom room = eventRoomRepository.findById(roomId)
                    .orElseThrow(() -> new CustomException(EVENT_NOT_FOUND));

            validateEventTiming(room);
            validateDuplicateParticipation(roomId, memberId);

            String rankingKey = RANKING_KEY_PREFIX + roomId;
            Long currentRanking = redisTemplate.opsForValue().increment(rankingKey);

            Participation participation = Participation.builder()
                    .room(room)
                    .member(member)
                    .joinedAt(LocalDateTime.now())
                    .ranking(currentRanking.intValue())
                    .isWinner(currentRanking <= room.getWinnerNum())
                    .build();

            Participation savedParticipation = participationRepository.save(participation);

            String queueKey = PARTICIPATION_QUEUE_PREFIX + roomId;
            ParticipationResponseDto responseDto = convertToDto(savedParticipation);
            redisTemplate.opsForList().rightPush(queueKey, responseDto);

            return responseDto;

        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new CustomException(LOCK_INTERRUPTED);
        } finally {
            if (lock.isHeldByCurrentThread()) {
                lock.unlock();
            }
        }
    }

    @Scheduled(fixedRate = 10000)
    public void processParticipationQueue() {
        log.info("10초마다 메세지 보내고 잇어요!!!!!!!!!!!!!!!!");
        Set<String> queueKeys = redisTemplate.keys(PARTICIPATION_QUEUE_PREFIX + "*");

        if (queueKeys == null || queueKeys.isEmpty()) {
            return;
        }

        for (String queueKey : queueKeys) {
            Long roomId = extractRoomId(queueKey);
            String lastProcessedKey = LAST_PROCESSED_ID_PREFIX + roomId; // 표시된 마지막 등수에 대한 키

            Integer lastProcessedRanking = (Integer) redisTemplate.opsForValue().get(lastProcessedKey);
            if (lastProcessedRanking == null) {
                lastProcessedRanking = 0;
            }

            List<ParticipationResponseDto> participations = new ArrayList<>();
            Object dto;

            while ((dto = redisTemplate.opsForList().leftPop(queueKey)) != null) { //redis에 쌓인 정보 모두
                try {
                    if (dto instanceof LinkedHashMap) {
                        @SuppressWarnings("unchecked")
                        LinkedHashMap<String, Object> map = (LinkedHashMap<String, Object>) dto;

                        // ArrayList를 LocalDateTime으로 변환
                        LocalDateTime joinedAt;
                        if (map.get("joinedAt") instanceof ArrayList) {
                            @SuppressWarnings("unchecked")
                            ArrayList<Integer> dateList = (ArrayList<Integer>) map.get("joinedAt");
                            joinedAt = LocalDateTime.of(
                                    dateList.get(0), // year
                                    dateList.get(1), // month
                                    dateList.get(2), // day
                                    dateList.get(3), // hour
                                    dateList.get(4), // minute
                                    dateList.get(5), // second
                                    dateList.get(6)  // nanosecond
                            );
                        } else {
                            joinedAt = LocalDateTime.parse((String) map.get("joinedAt"));
                        }

                        ParticipationResponseDto participationDto = ParticipationResponseDto.builder()
                                .eventId(((Number) map.get("eventId")).longValue())
                                .memberId(((Number) map.get("memberId")).longValue())
                                .joinedAt(joinedAt)
                                .ranking(((Number) map.get("ranking")).intValue())
                                .isWinner((Boolean) map.get("isWinner"))
                                .winnerName((String) map.get("winnerName"))
                                .build();

                        if (participationDto.getRanking() > lastProcessedRanking) { //표시된 마지막 랭킹보다 뒤에만 전송
                            participations.add(participationDto);
                            log.info("Added participation: {}", participationDto);
                        }
                    }
                } catch (Exception e) {
                    log.error("Error converting participation data: {} - Error: {}", dto, e.getMessage());
                }
            }

            log.info("Participations to send: {}", participations);
            if (!participations.isEmpty()) {
                participations.sort(Comparator.comparing(ParticipationResponseDto::getRanking));

                messagingTemplate.convertAndSend(
                        "/result/sub/participations/" + roomId,
                        participations
                );

                redisTemplate.opsForValue().set(
                        lastProcessedKey, //몇등까지 표시했는지 갱신해줌
                        participations.get(participations.size() - 1).getRanking()
                );

                log.info("Sent {} participations for room {}", participations.size(), roomId);
            }
        }
    }

    private Long extractRoomId(String queueKey) {
        return Long.parseLong(queueKey.substring(queueKey.lastIndexOf(':') + 1));
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