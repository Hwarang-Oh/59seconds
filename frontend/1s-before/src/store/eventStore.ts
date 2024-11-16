import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// IMP: 이벤트의 참여코드를 한 번 풀면 상태 지속될 수 있도록 store에 저장
// RES: 수정 전에는 isAuthenticated와 isCodeValid가 함께 관리가 되니까 하나가 풀리면 다 풀리는 문제 발생

// RES: 타입 지정
interface EventState {
  eventStates: Record<
    number,
    { isAuthenticated: boolean; isCodeValid: boolean }
  >;
  setEventState: (
    eventId: number,
    state: { isAuthenticated: boolean; isCodeValid: boolean }
  ) => void;
}

// RES: 분리해서 저장
export const useEventStore = create<EventState>()(
  persist(
    (set) => ({
      eventStates: {}, // 이벤트별 상태 초기화
      setEventState: (eventId, state) =>
        set((prevState) => ({
          eventStates: {
            ...prevState.eventStates,
            [eventId]: state, // 특정 이벤트 방 상태 업데이트
          },
        })),
    }),
    {
      name: 'event-auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
