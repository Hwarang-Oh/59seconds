import { EventRoomMessageInfo } from '@/types/eventRoom';
import { formatTimeBasic2 } from '@/utils/timeUtils';

export default function EventChatMessage({
  eventId,
  memberId,
  sender,
  content,
  sentAt,
  isMine,
}: Readonly<EventRoomMessageInfo>) {
  return (
    <div
      className={`flex flex-col gap-2 mb-3 ${
        isMine ? 'items-end' : 'items-start' // 본인 메시지는 오른쪽 정렬
      }`}>
      {!isMine && <p className='font-bold text-xs leading-normal'>{sender}</p>}
      <div
        className={`flex items-end gap-3 ${
          isMine ? 'flex-row-reverse' : '' // 본인 메시지는 아이콘과 내용 순서 반전
        }`}>
        <p
          className={`py-2 px-4 leading-normal font-semibold text-base rounded-[20px] ${
            isMine
              ? 'bg-blue-500 text-white' // 본인 메시지 스타일
              : 'bg-[#C4C5D7] text-[#1C1C1E]' // 상대방 메시지 스타일
          }`}>
          {content}
        </p>
        <p className='font-semibold text-xs leading-normal text-[#999]'>
          {formatTimeBasic2(sentAt)}
        </p>
      </div>
    </div>
  );
}
