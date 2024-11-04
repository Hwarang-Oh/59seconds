package com.ssafy.fiftyninesec.search.repository;

import com.ssafy.fiftyninesec.search.entity.Keyword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KeywordRepository extends JpaRepository<Keyword, Integer> {
    Keyword findByWord(String word);
}
