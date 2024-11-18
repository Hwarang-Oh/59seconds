'use client';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Modal from '@/components/common/alertModal';
import EventOwnerCreate from '@/components/eventCreate/EventOwnerCreate';
import EventDetailCreate from '@/components/eventCreate/EventDetailCreate';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createEvent } from '@/apis/eventAPI';
import { useMemberStore } from '@/store/memberStore';
import { useEventOwner } from '@/hooks/eventOwnerHook';
import { useEventCreate } from '@/hooks/eventCreateHook';
import { useEventCreateStore } from '@/store/eventCreateStore';

export default function EventCreate() {
  const router = useRouter();
  const { member } = useMemberStore();
  const { formData } = useEventCreateStore();
  const { validateOwnerData, handleUserSubmit, userErrorMessage } =
    useEventOwner();
  const {
    isModalOpen,
    modalMessage,
    eventErrorMessage,
    setIsModalOpen,
    setModalMessage,
    eventDetailValidCheck,
  } = useEventCreate();

  const clearFormData = useEventCreateStore((state) => state.clearFormData);

  useEffect(() => {
    clearFormData();
  }, [clearFormData]);

  const validateAndSubmitEvent = async (event: {
    preventDefault: () => void;
  }) => {
    event.preventDefault();

    try {
      const isDetailValid = await eventDetailValidCheck(event);
      const isUserValid = validateOwnerData();

      // IMP: 하나라도 실패하면 종료
      if (!isDetailValid || !isUserValid) {
        const combinedErrorMessage = [eventErrorMessage, userErrorMessage]
          .filter(Boolean)
          .join(' ');

        setModalMessage(
          combinedErrorMessage || '입력되지 않은 정보가 있습니다.'
        );
        setIsModalOpen(true);
        return;
      }

      // IMP: handleUserSubmit로 크리에이터 정보 저장
      const isUserSubmitted = await handleUserSubmit();
      if (!isUserSubmitted) {
        setModalMessage('유저 정보를 저장하는 중 오류가 발생했습니다.');
        setIsModalOpen(true);
        return;
      }

      const formDataToSend = new FormData();

      const eventData = {
        memberId: member?.memberId ?? 0,
        eventInfo: {
          title: formData.eventInfo.title,
          description: formData.eventInfo.description,
        },
        productsOrCoupons: formData.productsOrCoupons.map((item, index) => ({
          order: index + 1,
          type: item.type,
          name: item.name,
          recommendedPeople: item.recommendedPeople,
        })),
        eventPeriod: {
          start: new Date(formData.eventPeriod.start).toISOString(),
          end: new Date(formData.eventPeriod.end).toISOString(),
        },
        participationCode: formData.participationCode,
      };

      const eventBlob = new Blob([JSON.stringify(eventData)], {
        type: 'application/json',
      });

      formDataToSend.append('data', eventBlob);

      if (formData.eventInfo.bannerImage) {
        formDataToSend.append('bannerImage', formData.eventInfo.bannerImage);
      }

      if (formData.eventInfo.rectImage) {
        formDataToSend.append('rectImage', formData.eventInfo.rectImage);
      }

      await createEvent(formDataToSend);

      setModalMessage('이벤트가 성공적으로 생성되었습니다!');
      setIsModalOpen(true);

      setTimeout(() => {
        setIsModalOpen(false);
        router.push('/');
      }, 3000);
    } catch (error) {
      console.error('이벤트 생성 중 오류:', error);
      setModalMessage(
        '이벤트 생성 중 오류가 발생했습니다. 다시 시도해 주세요.'
      );
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <Header />
      <div className="m-10 flex justify-center items-center">
        <div className="w-full max-w-screen-xl">
          <h1 className="text-mainColor1 text-3xl font-bold text-center mb-10">
            이벤트 생성하기
          </h1>
          <div className="border border-inherit p-10 rounded-lg shadow-lg">
            <form className="p-6 w-[90%] mx-auto space-y-6">
              <EventDetailCreate />
            </form>
            <form className="p-6 w-[90%] mx-auto space-y-6">
              <EventOwnerCreate />
            </form>

            <div className="flex space-x-4 justify-center">
              <button
                type="button"
                onClick={() => router.back()}
                className="min-w-40 py-2 px-4 bg-gray-300 rounded text-gray-700"
              >
                이전
              </button>
              <button
                type="button"
                onClick={validateAndSubmitEvent}
                className="min-w-40 py-2 px-4 bg-mainColor1 text-white rounded"
              >
                이벤트 생성
              </button>
              <Modal
                message={modalMessage}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
