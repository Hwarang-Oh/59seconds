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
        color: '#000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      };
    }
    return {
      backgroundColor: '#E5E5E5',
      padding: '5px 13px 5px 14px',
      borderRadius: '40px',
      color: '#000',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    };
  };
  const renderButtons = () => {
    if (status === 'ONGOING') {
      return <div style={getButtonStyle()}>진행중</div>;
    }
    if (status === 'COMPLETED') {
      return (
        <div style={{ display: 'flex', gap: '5px' }}>
          <div style={getButtonStyle()}>완료</div>
          <div style={getButtonStyle()}>입력 완료</div>
        </div>
      );
    }
    if (status === 'COMPLETED_NO_WINNER_INFO') {
      return (
        <div style={{ display: 'flex', gap: '5px' }}>
          <div style={getButtonStyle()}>완료</div>
          <div style={getButtonStyle()}>입력 중</div>
        </div>
      );
    }
  };
  return <>{renderButtons()}</>;
}
