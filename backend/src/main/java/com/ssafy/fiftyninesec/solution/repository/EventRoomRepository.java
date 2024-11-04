package com.ssafy.fiftyninesec.solution.repository;

import com.ssafy.fiftyninesec.solution.entity.EventRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRoomRepository extends JpaRepository<EventRoom, Integer> {
}
