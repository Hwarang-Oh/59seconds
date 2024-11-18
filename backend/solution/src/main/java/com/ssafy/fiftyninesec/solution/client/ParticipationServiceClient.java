package com.ssafy.fiftyninesec.solution.client;

import com.ssafy.fiftyninesec.solution.client.dto.ParticipatedEventFeignResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "participation-service", url = "${participation-service.url}")
public interface ParticipationServiceClient {

    @GetMapping("${participation-service.version}/participations")
    List<ParticipatedEventFeignResponseDto> getParticipationsByMemberId(@RequestParam long memberId);
}
