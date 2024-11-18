import { create } from 'zustand';
import { UserData } from '@/types/user';

interface EventOwnerStore {
  ownerData: UserData;
  setOwnerData: (data: Partial<UserData>) => void;
}

export const useEventOwnerStore = create<EventOwnerStore>((set) => ({
  ownerData: {
    participateName: '',
    creatorName: '',
    address: '',
    phone: '',
    profileImage: '',
    creatorIntroduce: '',
    snsLink: '',
  },
  setOwnerData: (data) =>
    set((state) => ({
      ownerData: { ...state.ownerData, ...data },
    })),
}));
