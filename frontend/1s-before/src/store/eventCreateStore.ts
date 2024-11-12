import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { EventFormData, EventStoreState } from '@/types/eventCreate';

export const useEventCreateStore = create<EventStoreState>((set) => ({
  formData:
    JSON.parse(sessionStorage.getItem('formData') ?? 'null') ||
    ({
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
    } as EventFormData),
  setFormData: (data) => {
    set((state) => {
      const updatedFormData =
        typeof data === 'function' ? data(state.formData) : data;
      sessionStorage.setItem('formData', JSON.stringify(updatedFormData));
      return { formData: updatedFormData };
    });
  },
}));
