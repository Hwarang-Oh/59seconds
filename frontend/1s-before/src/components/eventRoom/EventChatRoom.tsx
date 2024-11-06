import { useEffect, useRef } from 'react';
import { EventChatRoomProps } from '@/types/eventRoom';
import EventChatMessage from '@/components/eventRoom/EventChatMessage';

export default function EventChatRoom({ messages }: Readonly<EventChatRoomProps>) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // messages가 업데이트될 때마다 스크롤을 맨 아래로 이동
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className='h-[600px] overflow-y-auto'>
      {messages.map((message) => (
        <EventChatMessage
          key={message.sentAt}
          eventId={message.eventId}
          sender={message.sender}
          content={message.content}
          sentAt={message.sentAt}
        />
      ))}
      {/* 스크롤을 맨 아래로 이동시키기 위한 빈 div */}
      <div ref={messagesEndRef} />
    </div>
  );
}
