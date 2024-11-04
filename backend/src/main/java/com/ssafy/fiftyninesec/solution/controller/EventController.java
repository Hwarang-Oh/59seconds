package com.ssafy.fiftyninesec.solution.controller;

import com.ssafy.fiftyninesec.solution.dto.EventRoomRequestDto;
import com.ssafy.fiftyninesec.solution.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rooms")
@RequiredArgsConstructor
public class EventController {

    EventService eventService;

    ResponseEntity<Void> createEventRoom(@RequestBody EventRoomRequestDto eventRoomRequestDto) {
        eventService.createEventRoom(eventRoomRequestDto);
        return ResponseEntity.ok().build();
    }

}
