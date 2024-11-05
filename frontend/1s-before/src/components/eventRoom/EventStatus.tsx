import PeopleIcon from '@/components/icon/PeopleIcon';
import FireIcon from '@/components/icon/FireIcon';
export default function EventStats() {
  return (
    <div className='flex flex-col gap-[30px] px-2'>
      <div className='flex justify-between items-center'>
        <div className='flex text-lg font-semibold items-center gap-2' style={{ color: '#6F717B' }}>
          <PeopleIcon /> 현재 참여자
        </div>
        <p className='text-[21px] font-semibold' style={{ color: '#9E96C1' }}>
          32,847명
        </p>
      </div>
      <div className='flex justify-between items-center'>
        <div className='flex text-lg font-semibold items-center gap-2' style={{ color: '#6F717B' }}>
          <FireIcon /> 예상 경쟁률
        </div>
        <p className='text-[21px] font-semibold' style={{ color: '#F26E68' }}>
          1 : 3.28
        </p>
      </div>
    </div>
  );
}
