import { create } from 'zustand';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EventFormData, EventStoreState } from '@/types/eventCreate';

export const useEventCreateStore = create<EventStoreState>((set) => ({
  formData: (() => {
    // 클라이언트 환경에서만 sessionStorage에서 데이터를 가져옴
    if (typeof window !== 'undefined') {
      const storedFormData = sessionStorage.getItem('formData');
      return storedFormData
        ? JSON.parse(storedFormData)
        : {
            eventInfo: {
              title: '',
              description: '',
              bannerImage: null,
              rectImage: null,
            },
            productsOrCoupons: [
              {
                id: uuidv4(),
                order: 1,
                type: '상품',
                name: '',
                recommendedPeople: 0,
              },
            ],
            eventPeriod: {
              start: '',
              end: '',
            },
            participationCode: '',
          };
    }
    // 서버 환경에서는 초기값으로 빈 폼 데이터를 반환
    return {
      eventInfo: {
        title: '',
        description: '',
        bannerImage: null,
        rectImage: null,
      },
      productsOrCoupons: [
        {
          id: uuidv4(),
          order: 1,
          type: '상품',
          name: '',
          recommendedPeople: 0,
        },
      ],
      eventPeriod: {
        start: '',
        end: '',
      },
      participationCode: '',
    } as EventFormData;
  })(),

  setFormData: (data) => {
    set((state) => {
      const updatedFormData =
        typeof data === 'function' ? data(state.formData) : data;

      // 클라이언트 환경에서만 sessionStorage에 저장
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('formData', JSON.stringify(updatedFormData));
      }

      return { formData: updatedFormData };
    });
  },
}));

export const useClearFormDataOnUnload = () => {
  useEffect(() => {
    const handleUnload = () => {
      sessionStorage.removeItem('formData');
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);
};
