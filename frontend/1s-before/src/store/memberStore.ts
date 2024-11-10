import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface MemberState {
  memberId: number;
  nickname: string;
}

interface MemberStore {
  member: MemberState;
  setMember: (member: MemberState) => void;
  clearMember: () => void;
  plusMemberId: () => void;
}

const defaultMember: MemberState = {
  memberId: 760,
  nickname: 'Guest',
};

export const useMemberStore = create(
  persist<MemberStore>(
    (set) => ({
      member: defaultMember,
      setMember: (member) => set({ member }),
      clearMember: () => set({ member: defaultMember }),
      plusMemberId: () =>
        set((state) => ({
          member: {
            ...state.member,
            memberId: state.member.memberId + 1,
          },
        })),
    }),
    {
      name: 'member-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
