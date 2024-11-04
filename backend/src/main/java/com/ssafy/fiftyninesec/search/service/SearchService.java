package com.ssafy.fiftyninesec.search.service;

import com.ssafy.fiftyninesec.search.dto.EventRoomSearchRequestDto;
import com.ssafy.fiftyninesec.search.dto.EventRoomSearchResponseDto;
import com.ssafy.fiftyninesec.search.entity.EventRoomSearch;
import com.ssafy.fiftyninesec.search.repository.EventRoomSearchRepository;
import com.ssafy.fiftyninesec.solution.entity.EventRoom;
import com.ssafy.fiftyninesec.solution.repository.EventRoomRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class SearchService {

    private final EventRoomSearchRepository eventRoomSearchRepository; // Elasticsearch 레포지토리
    private final EventRoomRepository eventRoomRepository; // JPA 레포지토리

    // 애플리케이션 시작 시 데이터 동기화
    @PostConstruct
    public void synchronizeData() {
        // 기존 인덱스 삭제
        eventRoomSearchRepository.deleteAll();

        List<EventRoom> mysqlRooms = eventRoomRepository.findAll();
        List<EventRoomSearch> esRooms = mysqlRooms.stream()
                .map(this::convertToES)
                .collect(Collectors.toList());
        eventRoomSearchRepository.saveAll(esRooms);

    }

    private EventRoomSearch convertToES(EventRoom mysqlRoom) {
        EventRoomSearch esRoom = new EventRoomSearch();
        esRoom.setRoomId(mysqlRoom.getRoomId());
        esRoom.setMemberId(mysqlRoom.getMemberId());
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
        dto.setRoomId(eventRoomSearch.getRoomId());
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
}