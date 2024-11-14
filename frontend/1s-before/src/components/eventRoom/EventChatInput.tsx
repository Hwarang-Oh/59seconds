'use client';
import webSocket from '@/apis/webSocket';
import SendIcon from '@/components/icon/SendIcon';
import { useState } from 'react';
import { useMemberStore } from '@/store/memberStore';
import { EventRoomMessageInfo } from '@/types/eventRoom';

export default function EventChatInput({ eventId }: Readonly<{ eventId: number }>) {
  const [input, setInput] = useState('');
  const { member } = useMemberStore();

  const handleSendMessage = () => {
    if (input.trim() !== '' && member) {
      webSocket.sendEventRoomMessage(eventId, {
        eventId,
        sender: member.nickname,
        content: input,
        sentAt: new Date().toISOString(),
      } as EventRoomMessageInfo);
      setInput('');
    }
  };

  return (
    <div
      className='flex items-center px-4 gap-1 mb-5 border rounded-2xl border-gray-300 cursor-pointer'
      onClick={(e) => e.stopPropagation()}>
      <input
        className='w-full py-4 text-base font-normal leading-6
      focus:outline-none focus:border-transparent'
        type='text'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyUp={(e) => e.key === 'Enter' && handleSendMessage()}
      />
      <button onClick={handleSendMessage}>
        <SendIcon />
      </button>
    </div>
  );
}
