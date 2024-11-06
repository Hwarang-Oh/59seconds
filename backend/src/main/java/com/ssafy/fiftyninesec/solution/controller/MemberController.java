package com.ssafy.fiftyninesec.solution.controller;

import com.ssafy.fiftyninesec.solution.dto.MemberResponseDto;
import com.ssafy.fiftyninesec.solution.dto.MemberUpdateRequestDto;
import com.ssafy.fiftyninesec.solution.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping
    public ResponseEntity<MemberResponseDto> getMemberInfo(HttpServletRequest request) {
        return ResponseEntity.ok(memberService.getMemberInfo((Long)request.getAttribute("memberId")));
    }

    @PutMapping("/creatorName")
    public ResponseEntity<?> updateCreatorName(HttpServletRequest request, @RequestParam String creatorName) {
        memberService.updateField((Long) request.getAttribute("memberId"), "creatorName", creatorName);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/address")
    public ResponseEntity<?> updateAddress(HttpServletRequest request, @RequestParam String address) {
        memberService.updateField((Long) request.getAttribute("memberId"), "address", address);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/phone")
    public ResponseEntity<?> updatePhone(HttpServletRequest request, @RequestParam String phone) {
        memberService.updateField((Long) request.getAttribute("memberId"), "phone", phone);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/profileImage")
    public ResponseEntity<?> updateProfileImage(HttpServletRequest request, @RequestParam String profileImage) {
        memberService.updateField((Long) request.getAttribute("memberId"), "profileImage", profileImage);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/creatorIntroduce")
    public ResponseEntity<?> updateCreatorIntroduce(HttpServletRequest request, @RequestParam String creatorIntroduce) {
        memberService.updateField((Long) request.getAttribute("memberId"), "creatorIntroduce", creatorIntroduce);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/snsLink")
    public ResponseEntity<?> updateSnsLink(HttpServletRequest request, @RequestParam String snsLink) {
        memberService.updateField((Long) request.getAttribute("memberId"), "snsLink", snsLink);
        return ResponseEntity.ok().build();
    }

    // 9. profileImage, creatorName, snsLink, creatorIntroduce 4개 필드만 수정하는 API
    @PutMapping("/update-from-event")
    public ResponseEntity<?> updatePartialFields(HttpServletRequest request, @RequestBody MemberUpdateRequestDto updateDto) {
        memberService.updatePartialFields((Long) request.getAttribute("memberId"), updateDto);
        return ResponseEntity.ok().build();
    }
}
