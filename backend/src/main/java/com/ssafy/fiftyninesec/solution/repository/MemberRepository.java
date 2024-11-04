package com.ssafy.fiftyninesec.solution.repository;

import com.ssafy.fiftyninesec.solution.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<com.ssafy.fiftyninesec.solution.entity.Member, Long> {
    Optional<Member> findByKakaoSub(String kakaoSub);
}
