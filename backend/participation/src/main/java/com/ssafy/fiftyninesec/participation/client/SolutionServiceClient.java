package com.ssafy.fiftyninesec.participation.client;

import com.ssafy.fiftyninesec.participation.dto.response.EventRoomResponseDto;
import com.ssafy.fiftyninesec.participation.dto.response.MemberResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;

@FeignClient(name = "solution-service", url = "${solution-service.url}")
public interface SolutionServiceClient {

    @GetMapping("${solution-service.version}/members")
    Optional<MemberResponseDto> getMember(@RequestHeader Long memberId);

    @GetMapping("${solution-service.version}/rooms/{roomId}")
    Optional<EventRoomResponseDto> getEventRoom(@PathVariable Long roomId);
}