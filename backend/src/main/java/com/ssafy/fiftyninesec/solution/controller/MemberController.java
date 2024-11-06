package com.ssafy.fiftyninesec.solution.controller;

import com.ssafy.fiftyninesec.solution.dto.MemberResponseDto;
import com.ssafy.fiftyninesec.solution.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping
    public ResponseEntity<MemberResponseDto> getMemberInfo(HttpServletRequest request) {
        return ResponseEntity.ok(memberService.getMemberInfo((Long)request.getAttribute("memberId")));
    }

}
