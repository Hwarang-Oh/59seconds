import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

interface MemberState {
  memberId: number;
  nickname: string;
  creatorName: string;
  isCreatorMode: boolean;
  isLoggedIn: boolean;
}

interface MemberStore {
  member: MemberState;
  setMember: (
    memberId: number,
    nickname: string,
    creatokrName: string,
    isCreatorMode?: boolean,
    isLoggedIn?: boolean
  ) => void;
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
            : {
                memberId: 0,
                nickname: '',
                creatorName: '',
                isCreatorMode: false,
                isLoggedIn: false,
              },
        setMember: (memberId, nickname, creatorName, isCreatorMode = false) =>
          set({
            member: { memberId, nickname, creatorName, isCreatorMode, isLoggedIn: true },
          }),
        clearMember: () =>
          set({
            member: {
              memberId: 0,
              nickname: '',
              creatorName: '',
              isCreatorMode: false,
              isLoggedIn: false,
            },
          }),
        toggleCreatorMode: () =>
          set((state) => ({
            member: { ...state.member, isCreatorMode: !state.member.isCreatorMode },
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
