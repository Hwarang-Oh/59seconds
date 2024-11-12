interface CreatorEventStatusButtonProps {
  status: string;
}

export default function CreatorEventStatusButton({
  status,
}: Readonly<CreatorEventStatusButtonProps>) {
  const getButtonStyle = () => {
    if (status === 'ONGOING') {
      return {
        backgroundColor: '#B4F1B6',
        padding: '5px 7px',
        borderRadius: '40px',
        color: '#0A8706',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      };
    }
    return {
      backgroundColor: '#E5E5E5',
      padding: '5px 13px 5px 14px',
      borderRadius: '40px',
      color: '#999',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    };
  };
  const renderButtons = () => {
    if (status === 'ONGOING') {
      return (
        <div
          style={getButtonStyle()}
          className='flex justify-center items-center w-[60px] h-[28px] font-bold'>
          진행중
        </div>
      );
    }
    if (status === 'COMPLETED') {
      return (
        <div className='flex justify-start items-center font-bold gap-1'>
          <div className='w-[60px] h-[28px]' style={getButtonStyle()}>
            완료
          </div>
          <div className='w-[90px] h-[28px]' style={getButtonStyle()}>
            입력 완료
          </div>
        </div>
      );
    }
    if (status === 'COMPLETED_NO_WINNER_INFO') {
      return (
        <div className='flex justify-start items-center font-bold gap-1'>
          <div className='w-[60px] h-[28px]' style={getButtonStyle()}>
            완료
          </div>
          <div className='w-[80px] h-[28px]' style={getButtonStyle()}>
            입력 중
          </div>
        </div>
      );
    }
  };
  return <>{renderButtons()}</>;
}
