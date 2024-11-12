import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MemberState {
  memberId: number;
  nickname: string;
  isCreatorMode: boolean;
}

interface MemberStore {
  member: MemberState | null;
  setMember: (memberId: number, nickname: string) => void;
  clearMember: () => void;
  toggleCreatorMode: () => void;
}

export const useMemberStore = create<MemberStore>()(
  persist(
    (set) => ({
      member: null,
      setMember: (memberId, nickname) =>
        set({
          member: { memberId, nickname, isCreatorMode: false },
        }),
      clearMember: () => set({ member: null }),
      toggleCreatorMode: () =>
        set((state) => ({
          member: state.member
            ? { ...state.member, isCreatorMode: !state.member.isCreatorMode }
            : null,
        })),
    }),
    {
      name: 'member-storage',
      storage: {
        getItem: (name) => {
          const storedValue = sessionStorage.getItem(name);
          return storedValue ? JSON.parse(storedValue) : null;
        },
        setItem: (name, value) => sessionStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => sessionStorage.removeItem(name),
      },
    }
  )
);
