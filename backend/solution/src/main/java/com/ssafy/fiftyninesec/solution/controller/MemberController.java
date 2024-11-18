package com.ssafy.fiftyninesec.solution.controller;

import com.ssafy.fiftyninesec.global.util.MinioUtil;
import com.ssafy.fiftyninesec.solution.dto.response.CreatedEventResponseDto;
import com.ssafy.fiftyninesec.solution.dto.response.MemberResponseDto;
import com.ssafy.fiftyninesec.solution.dto.request.MemberUpdateRequestDto;
import com.ssafy.fiftyninesec.solution.dto.response.ParticipatedEventResponseDto;
import com.ssafy.fiftyninesec.solution.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final MinioUtil minioUtil;

    @GetMapping
    @Operation(summary = "회원 정보 조회", description = "현재 로그인한 회원의 정보를 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "회원 정보가 성공적으로 조회되었습니다."),
            @ApiResponse(responseCode = "404", description = "회원 정보를 찾을 수 없습니다.")
    })
    public ResponseEntity<MemberResponseDto> getMemberInfo(HttpServletRequest request) {
        return ResponseEntity.ok(memberService.getMemberInfo((Long) request.getAttribute("memberId")));
    }

    @PutMapping("/participateName")
    @Operation(summary = "참여자 이름 수정", description = "회원의 참여자 이름을 수정합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "참여자 이름이 성공적으로 수정되었습니다."),
            @ApiResponse(responseCode = "400", description = "잘못된 요청입니다.")
    })
    public ResponseEntity<?> updateParticipateName(HttpServletRequest request, @RequestParam String participateName) {
        memberService.updateField((Long) request.getAttribute("memberId"), "participateName", participateName);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/creatorName")
    @Operation(summary = "크리에이터 이름 수정", description = "회원의 크리에이터 이름을 수정합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "크리에이터 이름이 성공적으로 수정되었습니다."),
            @ApiResponse(responseCode = "400", description = "잘못된 요청입니다.")
    })
    public ResponseEntity<?> updateCreatorName(HttpServletRequest request, @RequestParam String creatorName) {
        memberService.updateField((Long) request.getAttribute("memberId"), "creatorName", creatorName);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/address")
    @Operation(summary = "주소 수정", description = "회원의 주소를 수정합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "주소가 성공적으로 수정되었습니다."),
            @ApiResponse(responseCode = "400", description = "잘못된 요청입니다.")
    })
    public ResponseEntity<?> updateAddress(HttpServletRequest request, @RequestParam String address) {
        memberService.updateField((Long) request.getAttribute("memberId"), "address", address);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/phone")
    @Operation(summary = "전화번호 수정", description = "회원의 전화번호를 수정합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "전화번호가 성공적으로 수정되었습니다."),
            @ApiResponse(responseCode = "400", description = "잘못된 요청입니다.")
    })
    public ResponseEntity<?> updatePhone(HttpServletRequest request, @RequestParam String phone) {
        memberService.updateField((Long) request.getAttribute("memberId"), "phone", phone);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/profileImage")
    @Operation(summary = "프로필 이미지 수정", description = "회원의 프로필 이미지를 수정합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "프로필 이미지가 성공적으로 수정되었습니다."),
            @ApiResponse(responseCode = "400", description = "잘못된 요청입니다.")
    })
    public ResponseEntity<?> updateProfileImage(HttpServletRequest request, @RequestParam MultipartFile profileImage) {
        Long memberId = (Long) request.getAttribute("memberId");
        String profileImageUrl = memberService.updateProfileImage(profileImage);
        memberService.updateField(memberId, "profileImage", profileImageUrl);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/creatorIntroduce")
    @Operation(summary = "크리에이터 소개 수정", description = "회원의 크리에이터 소개를 수정합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "크리에이터 소개가 성공적으로 수정되었습니다."),
            @ApiResponse(responseCode = "400", description = "잘못된 요청입니다.")
    })
    public ResponseEntity<?> updateCreatorIntroduce(HttpServletRequest request, @RequestParam String creatorIntroduce) {
        memberService.updateField((Long) request.getAttribute("memberId"), "creatorIntroduce", creatorIntroduce);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/snsLink")
    @Operation(summary = "SNS 링크 수정", description = "회원의 SNS 링크를 수정합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "SNS 링크가 성공적으로 수정되었습니다."),
            @ApiResponse(responseCode = "400", description = "잘못된 요청입니다.")
    })
    public ResponseEntity<?> updateSnsLink(HttpServletRequest request, @RequestParam String snsLink) {
        memberService.updateField((Long) request.getAttribute("memberId"), "snsLink", snsLink);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/update-from-event")
    @Operation(summary = "회원 정보 일부 수정", description = "특정 필드(프로필 이미지, 크리에이터 이름, SNS 링크, 크리에이터 소개)를 수정합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "회원 정보가 성공적으로 수정되었습니다."),
            @ApiResponse(responseCode = "400", description = "잘못된 요청입니다."),
            @ApiResponse(responseCode = "404", description = "회원 정보를 찾을 수 없습니다.")
    })
    public ResponseEntity<?> updatePartialFields(HttpServletRequest request, @RequestBody MemberUpdateRequestDto updateDto) {
        memberService.updatePartialFields((Long) request.getAttribute("memberId"), updateDto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/createdroom")
    public ResponseEntity<List<CreatedEventResponseDto>> getCreatedEventRooms(
            HttpServletRequest request,
            @RequestParam Long memberId
    ) {
//        List<CreatedEventResponseDto> events = memberService.getCreatedEventRooms((Long) request.getAttribute("memberId"));
        List<CreatedEventResponseDto> events = memberService.getCreatedEventRooms(memberId);
        return ResponseEntity.ok(events);
    }

    @GetMapping("/participatedroom")
    public ResponseEntity<List<ParticipatedEventResponseDto>> getParticipatedEventRooms(
            HttpServletRequest request,
            @RequestParam long memberId
    ) {
//        List<ParticipatedEventResponseDto> events = memberService.getParticipatedEventRooms((Long) request.getAttribute("memberId"));
        List<ParticipatedEventResponseDto> events = memberService.getParticipatedEventRooms(memberId);
        return ResponseEntity.ok(events);
    }
}
