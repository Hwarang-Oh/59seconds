import NavigateIcon from '@/components/icon/NavigateIcon';
export default function NavigateButton() {
  return (
    <div
      className='flex justify-center items-center gap-3 w-[260px] h-[60px]
    px-[30px] py-[20px] border border-[#DDD] rounded-[32px]'>
      <p className='text-[18px] font-bold'>더 많은 이벤트 보러가기</p>
      <NavigateIcon />
    </div>
  );
}
