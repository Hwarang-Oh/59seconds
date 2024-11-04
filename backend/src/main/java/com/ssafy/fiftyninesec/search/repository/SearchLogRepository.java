package com.ssafy.fiftyninesec.search.repository;

import com.ssafy.fiftyninesec.search.entity.SearchLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SearchLogRepository extends JpaRepository<SearchLog, Integer> {
}
