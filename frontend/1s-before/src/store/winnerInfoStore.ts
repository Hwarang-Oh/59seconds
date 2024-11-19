import { create } from 'zustand';
import { UserData, WinnerUserInfo } from '@/types/user';

interface WinnerInfoState {
  formData: WinnerUserInfo;
  isSavedData: boolean;
  showAddrModal: boolean;
  detailedAddress: string;
  userData: UserData | null;
  isModalOpen: boolean;
  modalMessage: string;
  setFormData: (data: Partial<WinnerUserInfo>) => void;
  setIsSavedData: (value: boolean) => void;
  setShowAddrModal: (value: boolean) => void;
  setDetailedAddress: (value: string) => void;
  setUserData: (data: UserData | null) => void;
  setIsModalOpen: (value: boolean) => void;
  setModalMessage: (message: string) => void;
}

export const useWinnerInfoStore = create<WinnerInfoState>((set) => ({
  formData: {
    memberId: 0,
    winnerName: '',
    address: '',
    phone: '',
    ranking: 0,
  },
  isSavedData: false,
  showAddrModal: false,
  detailedAddress: '',
  userData: null,
  isModalOpen: false,
  modalMessage: '',
  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
  setIsSavedData: (value) => set({ isSavedData: value }),
  setShowAddrModal: (value) => set({ showAddrModal: value }),
  setDetailedAddress: (value) => set({ detailedAddress: value }),
  setUserData: (data) => set({ userData: data }),
  setIsModalOpen: (value) => set({ isModalOpen: value }),
  setModalMessage: (message) => set({ modalMessage: message }),
}));
