import { create } from 'zustand';

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

export const useMemberStore = create<MemberStore>((set) => ({
  member: null, // 초기 상태를 null로 설정하여 로그인 전에는 member가 없는 상태로 유지
  setMember: (memberId, nickname) =>
    set({
      member: { memberId, nickname, isCreatorMode: false },
    }),
  clearMember: () => set({ member: null }), // 로그아웃 시 member 상태를 null로 재설정
  toggleCreatorMode: () =>
    set((state) => ({
      member: state.member ? { ...state.member, isCreatorMode: !state.member.isCreatorMode } : null, // member가 null이 아닌 경우에만 토글
    })),
}));
