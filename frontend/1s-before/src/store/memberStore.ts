import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface MemberState {
  memberId: number;
  nickname: string;
  isCreatorMode: boolean;
}

interface MemberStore {
  member: MemberState;
  setMember: (memberId: number, nickname: string) => void;
  clearMember: () => void;
  toggleCreatorMode: () => void;
}

const defaultMember: MemberState = {
  memberId: 0,
  nickname: 'Hwarang',
  isCreatorMode: false,
};

export const useMemberStore = create<MemberStore>()(
  persist(
    (set) => ({
      member: defaultMember,
      setMember: (memberId, nickname) =>
        set((state) => ({
          member: { ...state.member, memberId, nickname },
        })),
      clearMember: () => set({ member: defaultMember }),
      toggleCreatorMode: () =>
        set((state) => ({
          member: { ...state.member, isCreatorMode: !state.member.isCreatorMode },
        })),
    }),
    {
      name: 'member-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
