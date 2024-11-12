interface NavigateButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function NavigateButton({
  onClick,
  disabled = false,
}: Readonly<NavigateButtonProps>) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex justify-center items-center gap-3 w-[260px] h-[60px]
      px-[30px] py-[20px] border border-[#DDD] rounded-[32px] 
      ${disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-100'}`}
    >
      <p className="text-[18px] font-bold">더 많은 이벤트 보러가기</p>
    </button>
  );
}
