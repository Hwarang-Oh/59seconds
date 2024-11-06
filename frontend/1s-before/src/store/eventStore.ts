import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// IMP: 이벤트의 참여코드를 한 번 풀면 상태 지속될 수 있도록 store에 저장

interface EventState {
  isAuthenticated: boolean;
  isCodeValid: boolean;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setCodeValid: (isCodeValid: boolean) => void;
}

export const useEventStore = create<EventState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isCodeValid: false,
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setCodeValid: (isCodeValid) => set({ isCodeValid }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
