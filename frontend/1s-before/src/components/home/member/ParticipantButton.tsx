import { ParticipantButtonProps } from '@/types/home';

export default function ParticipantButton({ unlockCount }: Readonly<ParticipantButtonProps>) {
  // 인원 수에 따른 표시 형식 처리
  const displayText =
    unlockCount < 100 ? `${unlockCount}명` : `${Math.floor(unlockCount / 100) * 100}명+`;

  return (
    <div
      className='flex justify-center items-center min-w-[62px] h-[24px] 
      border-2 border-[#9E96C1] rounded-[4px] px-[6px] py-[5px]'>
      <p
        className='text-center text-[12px] font-bold'
        style={{
          color: '#9E96C1',
          lineHeight: '18px',
        }}>
        {displayText}
      </p>
    </div>
  );
}
