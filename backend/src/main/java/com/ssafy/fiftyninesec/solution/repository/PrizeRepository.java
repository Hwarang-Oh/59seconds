package com.ssafy.fiftyninesec.solution.repository;

import com.ssafy.fiftyninesec.solution.entity.Prize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrizeRepository extends JpaRepository<Prize, Integer> {
}
