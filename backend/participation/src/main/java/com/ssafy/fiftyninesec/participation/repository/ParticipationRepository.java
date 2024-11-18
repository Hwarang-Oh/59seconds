package com.ssafy.fiftyninesec.participation.repository;


import com.ssafy.fiftyninesec.participation.entity.Participation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParticipationRepository extends JpaRepository<Participation, Long> {
    List<Participation> findByRoomIdOrderByRankingAsc(Long roomId);
    List<Participation> findByMemberId(Long memberId);
    boolean existsByRoomIdAndMemberId(Long roomId, Long memberId);
}
