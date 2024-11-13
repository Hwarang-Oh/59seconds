'use client';
import Header from '@/components/common/Header';
import EventOwnerCreate from '@/components/eventCreate/EventOwnerCreate';
import PreviewComponent from '@/components/eventCreate/PreviewComponent';
import EventDetailCreate from '@/components/eventCreate/EventDetailCreate';
import { useRouter } from 'next/navigation';
import { useEventCreate } from '@/hooks/eventCreateHook';
import { useEventOwner } from '@/hooks/eventOwnerHook';

export default function EventCreate() {
  const router = useRouter();
  const { handleDetailSubmit } = useEventCreate();
  const { handleUserSubmit } = useEventOwner();

  const handleCreateEvent = async (event: { preventDefault: () => void }) => {
    try {
      await handleDetailSubmit(event);
      await handleUserSubmit(event);

      alert('이벤트가 성공적으로 생성되었습니다.');
      router.push('/');
    } catch (error) {
      console.error('이벤트 생성 중 오류 발생:', error);
      alert('이벤트 생성 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <>
      <Header />
      <div className='m-10'>
        <h1 className='text-mainColor1 text-3xl font-bold text-center mb-10'>이벤트 생성하기</h1>
        <div className='grid grid-cols-4 gap-8'>
          {/* 입력 폼: 2/3 */}
          <div className='col-span-3 border border-inherit p-10 rounded-lg shadow-lg'>
            <form className='p-6 max-w-screen-xl mx-auto space-y-4'>
              <EventDetailCreate />
            </form>
            <form className='p-6 mx-auto max-w-screen-xl space-y-6'>
              <EventOwnerCreate />
            </form>

            <div className='flex justify-between'>
              <button type='button' className='py-2 px-4 bg-gray-300 rounded text-gray-700'>
                이전
              </button>
              <button
                type='button'
                onClick={handleCreateEvent}
                className='py-2 px-4 bg-mainColor1 text-white rounded'>
                이벤트 생성하기
              </button>
            </div>
          </div>

          {/* 미리보기: 1/3 */}
          <div className='col-span-1 max-h-[70vh] border border-inherit p-10 rounded-lg shadow-lg'>
            <PreviewComponent />
          </div>
        </div>
      </div>
    </>
  );
}
