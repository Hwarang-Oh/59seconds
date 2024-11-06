import PersonIcon from '@/components/icon/PersonIcon';
import { EventChatRoomHeaderProps } from '@/types/eventRoom';

export default function EventChatRoomHeader({ participants }: Readonly<EventChatRoomHeaderProps>) {
  return (
    <div className='flex items-center justify-between pb-4 mb-9 pt-7 border-b'>
      <p className='text-lg font-semibold' style={{ color: '#1C1C1E' }}>
        실시간 채팅방
      </p>
      <div className='flex items-center gap-1 text-[15px] font-bold' style={{ color: '#1C1C1E' }}>
        <PersonIcon />
        {participants}
      </div>
    </div>
  );
}
