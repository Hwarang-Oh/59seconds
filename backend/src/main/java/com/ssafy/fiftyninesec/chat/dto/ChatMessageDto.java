package com.ssafy.fiftyninesec.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessageDto {
    private Long eventId;         // 채팅방 ID
    private String sender;         // 메시지 전송자
    private String content;        // 메시지 내용
    private LocalDateTime sentAt;  // 메시지 전송 시각
}
