package com.ssafy.fiftyninesec.solution.controller;

import com.ssafy.fiftyninesec.solution.dto.request.EventRoomRequestDto;
import com.ssafy.fiftyninesec.solution.dto.request.RoomUnlockRequest;
import com.ssafy.fiftyninesec.solution.dto.request.WinnerRequestDto;
import com.ssafy.fiftyninesec.solution.dto.response.EventRoomResponseDto;
import com.ssafy.fiftyninesec.solution.dto.response.RoomUnlockResponse;
import com.ssafy.fiftyninesec.solution.dto.response.WinnerResponseDto;
import com.ssafy.fiftyninesec.solution.entity.EventRoom;
import com.ssafy.fiftyninesec.solution.service.EventService;
import jakarta.validation.Valid;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.Page;

import java.util.List;

@RestController
@RequestMapping("/rooms")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;  // null이 아님을 보장
    }

    @Operation(summary = "이벤트 룸 생성", description = "새로운 이벤트 룸을 생성합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "이벤트 룸이 성공적으로 생성되었습니다.")
    })
    @PostMapping
    public ResponseEntity<Void> createEventRoom(
            @Parameter(description = "이벤트 룸 생성에 필요한 정보") @RequestBody EventRoomRequestDto eventRoomRequestDto) {
        eventService.createEventRoom(eventRoomRequestDto);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "이벤트 룸 수정", description = "기존의 이벤트 룸 정보를 수정합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "이벤트 룸이 성공적으로 수정되었습니다.")
    })
    @PutMapping
    public ResponseEntity<Void> updateEventRoom(
            @Parameter(description = "이벤트 룸 수정에 필요한 정보") @RequestBody EventRoomRequestDto eventRoomRequestDto) {
        eventService.updateEventRoom(eventRoomRequestDto);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "이벤트 룸 잠금 해제", description = "참여 코드를 사용하여 특정 이벤트 룸의 잠금을 해제합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "이벤트 룸이 성공적으로 잠금 해제되었습니다.")
    })
    @PostMapping("/{roomId}/unlock")
    public ResponseEntity<RoomUnlockResponse> unlockRoom(
            @Parameter(description = "잠금을 해제할 이벤트 룸 ID") @PathVariable Long roomId,
            @Valid @RequestBody RoomUnlockRequest request) {
        return ResponseEntity.ok(eventService.unlockRoom(roomId, request.getEnterCode()));
    }

    @Operation(summary = "이벤트 룸 우승자 정보 조회", description = "특정 이벤트 룸의 우승자 정보를 가져옵니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "우승자 정보가 성공적으로 조회되었습니다.")
    })
    @GetMapping("/{roomId}/winners")
    public ResponseEntity<WinnerResponseDto> getWinners(
            @Parameter(description = "우승자 정보를 조회할 이벤트 룸 ID") @PathVariable Long roomId) {
        return ResponseEntity.ok(eventService.getWinners(roomId));
    }

    @Operation(summary = "인기 이벤트 룸 조회", description = "페이지네이션을 통해 인기 이벤트 룸 목록을 가져옵니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "인기 이벤트 룸 목록이 성공적으로 조회되었습니다.")
    })
    @GetMapping("/popular")
    public ResponseEntity<Page<EventRoom>> getPopularRooms(
            @Parameter(description = "페이지 번호 (0부터 시작)", example = "0") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "한 페이지에 보여질 이벤트 룸의 수", example = "5") @RequestParam(defaultValue = "5") int size) {
        Page<EventRoom> popularRooms = eventService.getPopularEvents(page, size);
        return ResponseEntity.ok(popularRooms);
    }

    @Operation(summary = "마감 임박 이벤트 룸 조회", description = "마감이 임박한 이벤트 룸 목록을 가져옵니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "마감 임박 이벤트 룸 목록이 성공적으로 조회되었습니다.")
    })
    @GetMapping("/deadline")
    public ResponseEntity<List<EventRoom>> getDeadlineRooms(
            @Parameter(description = "조회할 마감 임박 이벤트 수", example = "6") @RequestParam(defaultValue = "6") int size) {
        List<EventRoom> deadlineRooms = eventService.getDeadlineEvents(size);
        return ResponseEntity.ok(deadlineRooms);
    }

    @Operation(summary = "우승자 정보 저장", description = "이벤트 룸의 우승자 정보를 저장합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "우승자 정보가 성공적으로 저장되었습니다.")
    })
    @PostMapping("/{roomId}/userinfo")
    public ResponseEntity<Void> saveWinner(
            @Parameter(description = "우승자 정보를 저장할 이벤트 룸 ID") @PathVariable Long roomId,
            @Valid @RequestBody WinnerRequestDto requestDto) {
        eventService.saveWinner(roomId, requestDto);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "이벤트 룸 정보 조회", description = "특정 이벤트 룸의 정보를 가져옵니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "이벤트 룸 정보가 성공적으로 조회되었습니다.")
    })
    @GetMapping("/{roomId}")
    public ResponseEntity<EventRoomResponseDto> getEventRoomInfo(
            @Parameter(description = "조회할 이벤트 룸 ID") @PathVariable Long roomId) {
        EventRoomResponseDto eventRoomResponseDto = eventService.getEventRoomInfo(roomId);
        return ResponseEntity.ok(eventRoomResponseDto);
    }

    @Operation(summary = "사용자의 최신 배너 조회", description = "특정 사용자의 최신 배너 URL을 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "사용자의 최신 배너 URL이 성공적으로 조회되었습니다.")
    })
    @GetMapping("/my-latest-banner")
    public ResponseEntity<String> getLatestBanner(
            @Parameter(description = "조회할 사용자의 멤버 ID") @RequestParam Long memberId) {
        String bannerUrl = eventService.getLatestBanner(memberId);
        return ResponseEntity.ok(bannerUrl);
    }

    // TEST -----------------------------------------------------------------------------------------
    @PostMapping("/test/upload")
    public ResponseEntity<?> testMinio(@RequestParam Integer eventId, @RequestParam("file") MultipartFile file) {
        eventService.testMinio(eventId, file);
        return ResponseEntity.ok().build();
    }

}
