export default function EventPendingState() {
  return (
    <div className='flex flex-col items-center gap-[105px]'>
      <div className='w-60 h-60 border-[12px] border-gray-400 border-t-[12px] border-t-[#474972] rounded-full animate-spin'></div>
      <div
        className='flex flex-col items-center gap-1 text-2xl text-gray-700 mb-1'
        style={{ color: '#1C1C1E' }}>
        <p>너무 빨라서 판단하기 어렵네요 😅</p>
        <p>잠시만 기다려주세요!</p>
      </div>
    </div>
  );
}
