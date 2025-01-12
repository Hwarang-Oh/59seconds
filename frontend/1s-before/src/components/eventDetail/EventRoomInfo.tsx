import { IoShareSocial } from 'react-icons/io5';
import { useEventDetail } from '@/hooks/eventDetailHook';
import { EventIntroTabProps } from '@/types/eventDetail';
import SocialSharePopUp from './SocialSharePopUp';
export default function EventRoomInfo({
  event,
  creator,
  id,
}: Readonly<EventIntroTabProps>) {
  const { title, prizes = [] } = event;
  const { openSharePopUp, closeSharePopUp, isSharePopupOpen } =
    useEventDetail(id);

  const totalProducts = prizes.reduce(
    (sum, product) => sum + product.winnerCount,
    0
  );

  return (
    <>
      <h2 className="text-lg font-bold text-gray-800 mb-1">
        [{creator?.creatorName ? creator?.creatorName : '이벤트'}] {title}
      </h2>
      <div className="flex flex-row justify-between">
        <p className="text-sm text-gray-500 mb-4">{totalProducts}명 추첨</p>
        <IoShareSocial
          className="text-mainColor1 cursor-pointer"
          size={18}
          onClick={openSharePopUp}
        />
      </div>
      {isSharePopupOpen && (
        <SocialSharePopUp
          onClose={closeSharePopUp}
          onCopyUrl={window.location.href}
        />
      )}
    </>
  );
}
