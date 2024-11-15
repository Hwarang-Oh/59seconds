package com.ssafy.fiftyninesec.solution.repository;

import com.ssafy.fiftyninesec.solution.entity.EventRoom;
import com.ssafy.fiftyninesec.solution.entity.Prize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PrizeRepository extends JpaRepository<Prize, Long> {
    Integer countByEventRoom_Id(Long id);
    List<Prize> findByEventRoom_Id(Long roomId);
    Optional<Prize> findByEventRoomAndRanking(EventRoom eventRoom, Integer ranking);
    Optional<Prize> findFirstByEventRoomAndRanking(EventRoom eventRoom, Integer ranking);
}
