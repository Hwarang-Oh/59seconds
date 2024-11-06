package com.ssafy.fiftyninesec.global.exception;

import co.elastic.clients.elasticsearch.nodes.Http;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 유저입니다."),
    EVENT_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 이벤트입니다."),
    CANNOT_MAKE_RANDOM_NICKNAME(HttpStatus.BAD_REQUEST, "랜덤 닉네임 생성에 실패했습니다."),

    INVALID_CODE(HttpStatus.UNAUTHORIZED, "잘못된 암호입니다."),
    INVALID_REQUEST(HttpStatus.BAD_REQUEST, "잘못된 요청입니다."),

    OAUTH_AUTHENTICATION_FAILED(HttpStatus.UNAUTHORIZED, "카카오 토큰을 얻을 수 없습니다."),

    REDIS_CANNOT_SAVE(HttpStatus.INTERNAL_SERVER_ERROR, "레디스에 저장할 수 없습니다."),

    KAKAOSUB_NOT_FOUND(HttpStatus.NOT_FOUND, "kakaoSub가 없습니다."),
    TOKEN_CANNOT_CREATE(HttpStatus.BAD_REQUEST, "토큰을 만들 수 없습니다."),

    // 필드 유효성 검사 관련 에러
    INVALID_FIELD_NAME(HttpStatus.BAD_REQUEST, "잘못된 형식의 필드 이름입니다."),
    INVALID_CREATOR_NAME(HttpStatus.BAD_REQUEST, "잘못된 형식의 creatorName입니다. 이름은 비어 있을 수 없으며 최대 50자까지 가능합니다."),
    INVALID_ADDRESS(HttpStatus.BAD_REQUEST, "잘못된 형식의 주소입니다. 주소는 최대 255자까지 가능합니다."),
    INVALID_PHONE(HttpStatus.BAD_REQUEST, "잘못된 형식의 전화번호입니다. 올바른 형식: 010-0000-0000"),
    INVALID_PROFILE_IMAGE(HttpStatus.BAD_REQUEST, "잘못된 형식의 프로필 이미지 경로입니다. 경로는 최대 100자까지 가능합니다."),
    INVALID_CREATOR_INTRODUCE(HttpStatus.BAD_REQUEST, "잘못된 형식의 자기소개입니다. 소개는 최대 1000자까지 가능합니다."),
    INVALID_SNS_LINK(HttpStatus.BAD_REQUEST, "잘못된 형식의 SNS 링크입니다. 링크는 올바른 URL 형식이어야 합니다.");

    ;

    private final HttpStatus httpStatus;
    private final String message;
}
