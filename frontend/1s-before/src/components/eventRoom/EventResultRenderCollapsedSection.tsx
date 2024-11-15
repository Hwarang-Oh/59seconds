interface RenderCollapsedSectionProps {
  count: number;
  onClick: () => void;
  label: string;
}

const RenderCollapsedSection: React.FC<RenderCollapsedSectionProps> = ({
  count,
  onClick,
  label,
}) => {
  if (count === 0) return null;
  return (
    <div
      onClick={onClick}
      className='cursor-pointer transition-all hover:bg-gray-100 rounded-lg p-4 flex items-center justify-center gap-2'>
      {[0, 0.2, 0.4].map((delay) => (
        <div
          key={delay}
          className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
      <span className='ml-2 text-gray-600'>{`${count}개의 ${label}`}</span>
    </div>
  );
};

export default RenderCollapsedSection;
