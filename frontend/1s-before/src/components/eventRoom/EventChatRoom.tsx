import { useEffect, useRef } from 'react';
import { EventChatRoomProps } from '@/types/eventRoom';
import EventChatMessage from '@/components/eventRoom/EventChatMessage';

export default function EventChatRoom({ messages }: Readonly<EventChatRoomProps>) {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={chatContainerRef}
      className='h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300'>
      {messages.map((message) => (
        <EventChatMessage
          key={message.sentAt}
          memberId={message.memberId}
          eventId={message.eventId}
          sender={message.sender}
          content={message.content}
          sentAt={message.sentAt}
        />
      ))}
    </div>
  );
}
