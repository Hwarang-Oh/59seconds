package com.ssafy.fiftyninesec.search.service;

import com.ssafy.fiftyninesec.search.entity.Keyword;
import com.ssafy.fiftyninesec.search.entity.SearchLog;
import com.ssafy.fiftyninesec.search.repository.KeywordRepository;
import com.ssafy.fiftyninesec.search.repository.SearchLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class LogService {

    private final KeywordRepository keywordRepository;
    private final SearchLogRepository searchLogRepository;

    public void logSearch(String keywordStr) {
        Keyword keyword = keywordRepository.findByWord(keywordStr);
        if (keyword == null) {
            keyword = new Keyword();
            keyword.setWord(keywordStr);
            keyword.setSearchCount(1);
        } else {
            keyword.setSearchCount(keyword.getSearchCount() + 1);
        }
        keywordRepository.save(keyword);

        SearchLog searchLog = new SearchLog();
        searchLog.setKeyword(keyword);
        searchLog.setMemberId(1); // 실제 회원 ID로 변경 필요
        searchLog.setSearchedAt(LocalDateTime.now());
        searchLogRepository.save(searchLog);
    }
}