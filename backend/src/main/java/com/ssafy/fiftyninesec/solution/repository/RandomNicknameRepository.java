package com.ssafy.fiftyninesec.solution.repository;

import com.ssafy.fiftyninesec.solution.entity.RandomNickname;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RandomNicknameRepository extends JpaRepository<RandomNickname, Long> {
}
