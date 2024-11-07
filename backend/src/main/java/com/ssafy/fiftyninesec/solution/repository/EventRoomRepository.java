package com.ssafy.fiftyninesec.solution.repository;

import com.ssafy.fiftyninesec.solution.entity.EventRoom;

import com.ssafy.fiftyninesec.solution.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface EventRoomRepository extends JpaRepository<EventRoom, Long> {
    Page<EventRoom> findAllByOrderByUnlockCountDesc(Pageable pageable);

    @Query(value = """
            SELECT e \
            FROM EventRoom e \
            WHERE e.endTime <= :endDateTime\s\
            AND (e.status = 'NOT_STARTED' OR e.status = 'COMPLETED') \
            ORDER BY e.endTime ASC""")
    List<EventRoom> findDeadlineEventsByUpcoming(@Param("endDateTime") LocalDateTime endDateTime, Pageable pageable);

    @Query(value = """
            SELECT e 
            FROM EventRoom e 
            WHERE e.member.id = :memberId 
            ORDER BY e.createdAt DESC
            LIMIT 1
            """)
    Optional<EventRoom> findLatestEventByMemberId(@Param("memberId") Long  memberId);
    List<EventRoom> findByMember(Member member, Sort sort);

}