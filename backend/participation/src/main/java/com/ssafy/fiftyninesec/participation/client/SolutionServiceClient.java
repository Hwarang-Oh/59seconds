package com.ssafy.fiftyninesec.participation.client;

import com.ssafy.fiftyninesec.participation.client.dto.UpdateEventStatusRequest;
import com.ssafy.fiftyninesec.participation.dto.response.EventRoomResponseDto;
import com.ssafy.fiftyninesec.participation.dto.response.MemberResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@FeignClient(name = "solution-service", url = "${solution-service.url}")
public interface SolutionServiceClient {

    @GetMapping("${solution-service.version}/members")
    Optional<MemberResponseDto> getMember(@RequestHeader Long memberId);

    @GetMapping("${solution-service.version}/rooms/{roomId}")
    Optional<EventRoomResponseDto> getEventRoom(@PathVariable Long roomId);

    @PutMapping("${solution-service.version}/rooms/{roomId}/status")
    ResponseEntity<Void> updateEventStatus(@PathVariable long roomId,
                                           @RequestBody UpdateEventStatusRequest dto);
}