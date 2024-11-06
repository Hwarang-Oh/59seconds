import webSocket from '@/apis/webSocket';
import SendIcon from '@/components/icon/SendIcon';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EventRoomMessageInfo } from '@/types/eventRoom';

export default function EventChatInput({ eventId }: Readonly<{ eventId: number }>) {
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim() !== '') {
      webSocket.sendEventRoomMessage(eventId, {
        eventId,
        sender: uuidv4(),
        content: input,
        sentAt: new Date().toISOString(),
      } as EventRoomMessageInfo);
      setInput('');
    }
  };

  return (
    <div className='flex items-center px-4 gap-1 border rounded-2xl border-gray-300 cursor-pointer'>
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
