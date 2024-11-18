import { ActiveButtonProps } from '@/types/eventRoom';

export default function EventStatusActiveButton({
  isDisabled,
  onClick,
  text,
}: Readonly<ActiveButtonProps>) {
  return (
    <div className='flex justify-center'>
      <button
        className={`items-center w-[210px] py-3 rounded-xl border shadow-md
      ${isDisabled ? 'bg-[#DCDDEC] text-gray-700 cursor-not-allowed' : 'bg-[#474972] text-white'}
        `}
        disabled={isDisabled}
        onClick={onClick}>
        <p className='font-bold text-2xl' style={{ color: '#FFFFFF', lineHeight: 'normal' }}>
          {text}
        </p>
      </button>
    </div>
  );
}
