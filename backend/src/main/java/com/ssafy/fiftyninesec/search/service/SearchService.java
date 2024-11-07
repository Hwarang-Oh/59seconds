package com.ssafy.fiftyninesec.search.service;

import com.ssafy.fiftyninesec.search.dto.EventRoomSearchRequestDto;
import com.ssafy.fiftyninesec.search.dto.EventRoomSearchResponseDto;
import com.ssafy.fiftyninesec.search.entity.EventRoomSearch;
import com.ssafy.fiftyninesec.search.repository.EventRoomSearchRepository;
import com.ssafy.fiftyninesec.solution.entity.EventRoom;
import com.ssafy.fiftyninesec.solution.entity.Member;
import com.ssafy.fiftyninesec.solution.repository.EventRoomRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.Criteria;
import org.springframework.data.elasticsearch.core.query.CriteriaQuery;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class SearchService {

    private final EventRoomSearchRepository eventRoomSearchRepository; // Elasticsearch 레포지토리
    private final EventRoomRepository eventRoomRepository; // JPA 레포지토리
    private final ElasticsearchOperations elasticsearchOperations;

    // 애플리케이션 시작 시 데이터 동기화
    @PostConstruct
    public void synchronizeData() {
        // 기존 인덱스 삭제
        eventRoomSearchRepository.deleteAll();

        List<EventRoom> mysqlRooms = eventRoomRepository.findAll();
        List<EventRoomSearch> esRooms = mysqlRooms.stream()
                .map(this::convertToES)
                .collect(Collectors.toList());

        esRooms.forEach(room -> room.setTitleCompletion(room.getTitle())); // titleCompletion 설정
        eventRoomSearchRepository.saveAll(esRooms);
    }

    private EventRoomSearch convertToES(EventRoom mysqlRoom) {
        Long memberId = Optional.ofNullable(mysqlRoom.getMember())
                .map(Member::getId)
                .orElseThrow(() -> new RuntimeException("Member is null for EventRoom ID: " + mysqlRoom.getId()));


        EventRoomSearch esRoom = new EventRoomSearch();
        esRoom.setRoomId(mysqlRoom.getId());
        esRoom.setMemberId(memberId);
        esRoom.setTitle(mysqlRoom.getTitle());
        esRoom.setDescription(mysqlRoom.getDescription());
        esRoom.setStatus(mysqlRoom.getStatus().name());
        esRoom.setCreatedAt(mysqlRoom.getCreatedAt());
        esRoom.setStartTime(mysqlRoom.getStartTime());
        esRoom.setEndTime(mysqlRoom.getEndTime());
        esRoom.setWinnerNum(mysqlRoom.getWinnerNum());
        esRoom.setEnterCode(mysqlRoom.getEnterCode());
        esRoom.setUnlockCount(mysqlRoom.getUnlockCount());
        esRoom.setBannerImage(mysqlRoom.getBannerImage());
        esRoom.setSquareImage(mysqlRoom.getSquareImage());
        esRoom.setRectangleImage(mysqlRoom.getRectangleImage());
        return esRoom;
    }

    public List<EventRoomSearchResponseDto> searchEventRooms(EventRoomSearchRequestDto requestDto) {
        List<EventRoomSearch> eventRooms = eventRoomSearchRepository.findByTitle(requestDto.getKeyword());
        return eventRooms.stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    private EventRoomSearchResponseDto mapToResponseDto(EventRoomSearch eventRoomSearch) {
        EventRoomSearchResponseDto dto = new EventRoomSearchResponseDto();
        dto.setEventId(eventRoomSearch.getRoomId());
        dto.setTitle(eventRoomSearch.getTitle());
        dto.setDescription(eventRoomSearch.getDescription());
        dto.setStatus(eventRoomSearch.getStatus());
        dto.setCreatedAt(eventRoomSearch.getCreatedAt());
        dto.setStartTime(eventRoomSearch.getStartTime());
        dto.setEndTime(eventRoomSearch.getEndTime());
        dto.setWinnerNum(eventRoomSearch.getWinnerNum());
        dto.setBannerImage(eventRoomSearch.getBannerImage());
        dto.setSquareImage(eventRoomSearch.getSquareImage());
        dto.setRectangleImage(eventRoomSearch.getRectangleImage());
        return dto;
    }

    public List<String> autocomplete(String keyword) {
        // 검색 키워드에서 공백 제거
        String processedKeyword = keyword.replace(" ", "");

        // CriteriaQuery를 이용해 title 필드에 keyword 포함 여부를 확인
        Criteria criteria = new Criteria("title").contains(processedKeyword);
        CriteriaQuery query = new CriteriaQuery(criteria);

        SearchHits<EventRoomSearch> searchHits = elasticsearchOperations.search(query, EventRoomSearch.class);

        return searchHits.stream()
                .map(hit -> hit.getContent().getTitle())
                .collect(Collectors.toList());
    }
}