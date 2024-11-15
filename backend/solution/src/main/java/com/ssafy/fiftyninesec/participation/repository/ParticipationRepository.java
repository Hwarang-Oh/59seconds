package com.ssafy.fiftyninesec.participation.repository;


import com.ssafy.fiftyninesec.participation.entity.Participation;
import com.ssafy.fiftyninesec.solution.entity.EventRoom;
import com.ssafy.fiftyninesec.solution.entity.Member;
import jakarta.persistence.LockModeType;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ParticipationRepository extends JpaRepository<Participation, Long> {
    Optional<List<Participation>> findByRoomIdOrderByRankingAsc(Long roomId);
    boolean existsByRoomIdAndMemberId(Long roomId, Long memberId);
    int countByRoomId(Long roomId);
    List<Participation> findByMemberId(Long memberId);
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT MAX(p.ranking) FROM Participation p WHERE p.room.id = :roomId")
    Optional<Integer> findMaxRankingByRoomId(@Param("roomId") Long roomId);
}
