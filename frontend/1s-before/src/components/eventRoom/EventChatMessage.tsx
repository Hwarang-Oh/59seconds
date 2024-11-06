import { EventRoomMessageInfo } from '@/types/eventRoom';

export default function EventChatMessage({
  eventId,
  sender,
  content,
  sentAt,
}: Readonly<EventRoomMessageInfo>) {
  return (
    <div className='flex flex-col gap-2 mb-3'>
      <p className='font-bold text-xs leading-normal'>{sender}</p>
      <div className='flex gap-3 items-end'>
        <p
          className='py-2 px-4 bg-[#C4C5D7] leading-normal font-semibold text-base rounded-[20px]'
          style={{ color: '#1C1C1E' }}>
          {content}
        </p>
        <p className='font-semibold text-xs leading-normal text-[#999]'>{sentAt}</p>
      </div>
    </div>
  );
}
