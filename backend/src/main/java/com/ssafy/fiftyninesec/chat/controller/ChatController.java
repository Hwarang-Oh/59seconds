package com.ssafy.fiftyninesec.chat.controller;

import com.ssafy.fiftyninesec.chat.dto.ChatMessageDto;
import com.ssafy.fiftyninesec.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatService chatService;

    @MessageMapping("/sendMessage/{roomId}")
    public void sendMessage(@Payload ChatMessageDto chatMessage, @DestinationVariable Long roomId) {
        ChatMessageDto updatedMessage = ChatMessageDto.builder()
                .roomId(chatMessage.getRoomId())
                .sender(chatMessage.getSender())
                .content(chatMessage.getContent())
                .sentAt(LocalDateTime.now())
                .build();

        messagingTemplate.convertAndSend("/chat/sub/room/" + roomId, updatedMessage);
    }

    // 채팅방 입장
    @MessageMapping("/room/{roomId}/enter")
    public void enterChatRoom(@DestinationVariable Long roomId) {
        chatService.enterChatRoom(roomId);
    }

    // 채팅방 퇴장
    @MessageMapping("/room/{roomId}/leave")
    public void leaveChatRoom(@DestinationVariable Long roomId) {
        chatService.leaveChatRoom(roomId);
    }
}