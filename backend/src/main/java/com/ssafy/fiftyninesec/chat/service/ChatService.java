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

    public void enterChatRoom(Long roomId) {
        Long userCount = roomUserCount.computeIfPresent(roomId, (key, value) -> value + 1);
        if (userCount == 0) {
            roomUserCount.put(roomId, 1L);
            userCount = 1L;
        }
        sendUserCountUpdate(roomId, userCount);
    }

    public void leaveChatRoom(Long roomId) {
        Long userCount = roomUserCount.computeIfPresent(roomId, (key, value) -> value - 1);
        if (userCount <= 0) {
            roomUserCount.remove(roomId);
            userCount = 0L;
        }
        sendUserCountUpdate(roomId, userCount);
    }

    private void sendUserCountUpdate(Long roomId, Long userCount) {
        ChatRoomDto roomInfo = ChatRoomDto.builder()
                .roomId(roomId)
                .userCount(userCount)
                .build();
        messagingTemplate.convertAndSend("/chat/sub/room/" + roomId + "/count", roomInfo);
    }
}