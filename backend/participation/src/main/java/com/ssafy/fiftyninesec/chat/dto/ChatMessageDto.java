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
    private Long memberId;
    private String sender;         // 메시지 전송자
    private String content;        // 메시지 내용
    private LocalDateTime sentAt;  // 메시지 전송 시각

    public static ChatMessageDto of(Long eventId, Long memberId, String sender, String content) {
        return ChatMessageDto.builder()
                .eventId(eventId)
                .memberId(memberId)
                .sender(sender)
                .content(content)
                .sentAt(LocalDateTime.now())
                .build();
    }
}
