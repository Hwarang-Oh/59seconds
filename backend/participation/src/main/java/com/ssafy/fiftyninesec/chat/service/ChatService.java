package com.ssafy.fiftyninesec.chat.service;

import com.ssafy.fiftyninesec.chat.dto.ChatRoomDto;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final SimpMessagingTemplate messagingTemplate;
    private final ConcurrentHashMap<Long, Long> roomUserCount = new ConcurrentHashMap<>();

    public void enterChatRoom(Long eventId) {
        // eventId가 존재하지 않으면 초기값 1L을 설정하고, 존재하면 현재 값에 1을 더해줌
        Long userCount = roomUserCount.compute(eventId, (key, value) -> (value == null) ? 1L : value + 1);

        sendUserCountUpdate(eventId, userCount);
    }

    public void leaveChatRoom(Long eventId) {
        Long userCount = roomUserCount.computeIfPresent(eventId, (key, value) -> value > 1 ? value - 1 : 0L);

        // userCount가 null이거나 0일 경우 eventId를 roomUserCount에서 삭제
        if (userCount == null || userCount <= 0) {
            roomUserCount.remove(eventId);
            userCount = 0L;
        }
        sendUserCountUpdate(eventId, userCount);
    }

    private void sendUserCountUpdate(Long eventId, Long userCount) {
        ChatRoomDto roomInfo = ChatRoomDto.builder()
                .eventId(eventId)
                .userCount(userCount)
                .build();
        messagingTemplate.convertAndSend("/chat/sub/room/" + eventId + "/count", roomInfo);
    }
}