import Image from 'next/image';
import DeadlineButton from '@/components/home/member/DeadlineButton';
import ParticipantButton from '@/components/home/member/ParticipantButton';
import { NormalBannerProps } from '@/types/home';
export default function NormalBanner({
  id,
  rectImage,
  title,
  details,
  date,
  participants,
  isDeadline,
}: Readonly<NormalBannerProps>) {
  return (
    <div className='flex flex-col w-[240px]'>
      <div className='relative w-[240px] h-[320px] overflow-hidden rounded-lg'>
        <Image src={rectImage} alt={title} fill className='object-cover' quality={100} />
        <div
          className='absolute bottom-3 left-4 text-white text-[60px] font-bold'
          style={{
            textShadow: '0px 4px 4px rgba(0, 0, 0, 0.20)',
            fontFamily: '"Segoe UI", sans-serif',
          }}>
          1
        </div>
      </div>

      {/* 내용 */}
      <div className='py-[5px]'>
        <p className='text-lg font-bold whitespace-pre-line'>{title}</p>
        <p className='text-base'>{details}</p>
        <p className='text-bse text-gray-400'>{date}</p>
      </div>

      {/* 참가자 수와 마감 임박 배지 */}
      <div className='flex justify-start gap-5 items-center'>
        <ParticipantButton participants={participants} />
        {isDeadline && <DeadlineButton />}
      </div>
    </div>
  );
}
