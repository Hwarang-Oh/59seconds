export default function DeadlineButton() {
  return (
    <div
      className='flex justify-center items-center w-[62px] h-[24px] 
      border-2 border-[#F26E68] border-solid rounded-[4px] px-[6px] py-[5px]'>
      <p
        className='text-center text-[12px] font-bold'
        style={{
          color: '#F26E68',
          lineHeight: '18px',
        }}>
        마감임박
      </p>
    </div>
  );
}
