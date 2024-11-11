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
}

const defaultMember: MemberState = {
  memberId: 2,
  nickname: 'Guest',
};

export const useMemberStore = create(
  persist<MemberStore>(
    (set) => ({
      member: defaultMember,
      setMember: (member) => set({ member }),
      clearMember: () => set({ member: defaultMember }),
    }),
    {
      name: 'member-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
