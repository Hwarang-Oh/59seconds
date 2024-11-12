import Image from 'next/image';
import CreatorEventStatusButton from '@/components/home/creator/CreatorEventStatusButton';
import { CreatorEventTypes } from '@/types/home';
export default function CreatorCardBanner({
  eventId,
  title,
  status,
  unlockCount,
  endTime,
  rectangleUrl,
}: Readonly<CreatorEventTypes>) {
  const participantLabel = status === 'ONGOING' ? '예상 참여자' : '최종 참여자';
  return (
    <div className='flex h-[185px] shadow-md'>
      <div className='relative w-[140px] overflow-hidden rounded-l-lg'>
        <Image src={rectangleUrl} alt={title} fill className='object-cover' />
      </div>
      <div className='flex flex-col w-[280px] justify-center px-5 gap-1 border rounded-r'>
        <CreatorEventStatusButton status={status} />
        <p className='text-[16px] font-semibold' style={{ color: '#FF7262' }}>
          {endTime} 후 이벤트 시작
        </p>
        <p className='text-lg font-bold whitespace-pre-line'>{title}</p>
        <div className='flex gap-1.5 items-center text-base'>
          <p>{participantLabel}:</p>
          <span className='font-bold'>{unlockCount}명</span>
        </div>
      </div>
    </div>
  );
}
