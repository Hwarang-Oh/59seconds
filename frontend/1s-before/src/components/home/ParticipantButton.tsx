import { ParticipantButtonProps } from '@/types/home';
export default function ParticipantButton({ participants }: Readonly<ParticipantButtonProps>) {
  // 인원 수에 따른 표시 형식 처리
  const displayText =
    participants < 100 ? `${participants}명` : `${Math.floor(participants / 100) * 100}명+`;

  return (
    <div
      className='flex justify-center items-center w-[62px] h-[24px] 
      border border-[#9E96C1] border-solid rounded-[4px] px-[6px]'>
      <p
        className='text-center text-[12px] font-bold'
        style={{
          color: '#9E96C1',
          fontFamily: 'Segoe UI, sans-serif',
          lineHeight: '18px',
        }}>
        {displayText}
      </p>
    </div>
  );
}
