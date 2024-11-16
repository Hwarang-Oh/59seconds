import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { EventFormData, EventStoreState } from '@/types/eventCreate';

export const useEventCreateStore = create<EventStoreState>((set) => ({
  formData: {
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
        recommendedPeople: 1,
      },
    ],
    eventPeriod: {
      start: '',
      end: '',
    },
    participationCode: '',
  } as EventFormData,

  setFormData: (data) => {
    set((state) => {
      const updatedFormData =
        typeof data === 'function' ? data(state.formData) : data;
      return { formData: updatedFormData };
    });
  },

  clearFormData: () => {
    set({
      formData: {
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
            recommendedPeople: 1,
          },
        ],
        eventPeriod: {
          start: '',
          end: '',
        },
        participationCode: '',
      },
    });
  },
}));
