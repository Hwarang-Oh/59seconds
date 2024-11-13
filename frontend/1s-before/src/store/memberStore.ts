import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

interface MemberState {
  memberId: number;
  nickname: string;
  isCreatorMode: boolean;
}

interface MemberStore {
  member: MemberState | null;
  setMember: (memberId: number, nickname: string, isCreatorMode?: boolean) => void;
  clearMember: () => void;
  toggleCreatorMode: () => void;
}

// 클라이언트 환경에서 sessionStorage를 사용하여 초기 상태 설정
export const useMemberStore = create<MemberStore>()(
  devtools(
    persist(
      (set) => ({
        member:
          typeof window !== 'undefined' && sessionStorage.getItem('member-storage')
            ? JSON.parse(sessionStorage.getItem('member-storage') as string)
            : null,
        setMember: (memberId, nickname, isCreatorMode = false) =>
          set({
            member: { memberId, nickname, isCreatorMode },
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
        storage:
          typeof window !== 'undefined'
            ? {
                getItem: (name) => {
                  const storedValue = sessionStorage.getItem(name);
                  return storedValue ? JSON.parse(storedValue) : null;
                },
                setItem: (name, value) => sessionStorage.setItem(name, JSON.stringify(value)),
                removeItem: (name) => sessionStorage.removeItem(name),
              }
            : undefined,
      }
    )
  )
);
