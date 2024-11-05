package com.ssafy.fiftyninesec.solution.repository;

import com.ssafy.fiftyninesec.solution.entity.EventRoom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRoomRepository extends JpaRepository<EventRoom, Long> {
    Page<EventRoom> findAllByOrderByUnlockCountDesc(Pageable pageable);
}