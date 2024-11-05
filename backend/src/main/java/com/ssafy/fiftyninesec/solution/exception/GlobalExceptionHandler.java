package com.ssafy.fiftyninesec.solution.exception;

import com.ssafy.fiftyninesec.solution.dto.RoomUnlockResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(RoomNotFoundException.class)
    public ResponseEntity<RoomUnlockResponse> handleRoomNotFoundException(RoomNotFoundException e) {
        RoomUnlockResponse response = RoomUnlockResponse.builder()
                .success(false)
                .message("존재하지 않는 방입니다.")
                .build();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<RoomUnlockResponse> handleException(Exception e) {
        log.error("Unexpected error occurred: ", e);
        RoomUnlockResponse response = RoomUnlockResponse.builder()
                .success(false)
                .message("서버 오류가 발생했습니다.")
                .build();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}