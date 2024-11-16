import WebsocketAPI from '@/apis/webSocket';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useMemberStore } from '@/store/memberStore';
import { fetchEventInfo } from '@/apis/eventDetailApi';
import { createPrizeRankingList } from '@/utils/prizeUtils';
import { calculateTimeDifferenceWithMilliseconds } from '@/utils/timeUtils';
import { eventParticipate, getFrontEventParticipationInfo } from '@/apis/eventAPI';
import {
  PrizeInfo,
  EventRoomInfo,
  EventRoomCurrentInfo,
  EventRoomMessageInfo,
  EventRoomResultInfo,
  EventRoomResultViewInfo,
} from '@/types/eventRoom';

/**
 * IMP : EventRoom의 진행 상태를 관리하는 Hook
 * @returns
 */
export const useEventProgress = () => {
  // IMP : URL 파라미터를 가져오기 위한 useParams => eventId와 memberData를 가져옵니다.
  const { member, setMember } = useMemberStore();
  const params = useParams();
  let eventId: string;
  let memberData;

  // IMP : URL을 통해 eventId와 memberData를 가져옵니다.
  // IMP : HTTP 요청을 통해 EventRoom의 정보를 가져옴
  // IMP : WebSocket을 통해 EventRoom의 정보를 실시간으로 가져옵니다.
  useEffect(() => {
    // * 1. URL을 통해 eventId와 memberData를 가져옵니다.
    const urlParams = new URLSearchParams(window.location.search);
    memberData = urlParams.get('memberData');
    eventId = params?.id as string;

    // * 2. memberData와 eventId가 존재할 때, EventRoom의 정보를 가져옵니다.
    // * 3. WebSocket을 통해 EventRoom의 정보를 실시간으로 가져옵니다.
    if (memberData && eventId) {
      const parsedMemberData = JSON.parse(decodeURIComponent(memberData));
      const { memberId, nickname, isCreatorMode } = parsedMemberData.state.member;
      setMember(memberId, nickname, isCreatorMode);

      // * HTTP : EventRoom의 정보를 가져옵니다.
      fetchEventInfo(Number(eventId)).then((eventInfo) => {
        setEventInfo({
          eventId: Number(eventId),
          creatorName: eventInfo.memberResponseDto.creatorName,
          title: eventInfo.title,
          winnerNum: eventInfo.winnerNum,
          eventTime: eventInfo.endTime,
          bannerImage: eventInfo.bannerImage,
          prizes: eventInfo.prizes,
        });
        setPrizeList(createPrizeRankingList(eventInfo.prizes));
      });

      // * WebSocket : EventRoom의 정보를 실시간으로 가져옵니다.
      WebsocketAPI.connect({
        eventId: Number(eventId),
        memberId: memberId,
        onEventRoomInfoReceived: (eventRoomInfo) => setEventStatus(eventRoomInfo),
        onMessageReceived: (messageInfo) =>
          setMessages((prevMessages) => [...prevMessages, messageInfo]),
        onEventRoomResultReceived: (eventRoomResult) => getEventResult(eventRoomResult),
        subscriptions: ['eventRoomInfo', 'eventRoomMessage', 'eventRoomResult'],
      });

      // IMP : CleanUp => EventRoom을 나갈 때, 해당 Room에 대한 WebSocket을 해제합니다.
      return () => WebsocketAPI.disconnectFromEvent(Number(eventId));
    }
  }, [params]);

  /**
   * IMP : EventRoom의 진행 상태를 관리하는 State
   * @isDrawing : 추첨 진행 상태 여부
   * @isChatExpanded : ChatRoom의 크기가 확장되었는지 여부
   * @eventInfo : EventRoom의 기본적인 정보
   * @prizeList : EventRoom의 Ranking에 대한 Prize 정보
   * @messages : EventRoom의 ChatRoom 메시지 리스트
   * @eventStatus : EventRoom의 현재 상태 정보
   * @untilMyResult : 나를 포함한 Event Participation 결과 이전의 리스트 ( HTTP, ONCE )
   * @eventResult : EventRoom의 전체 Event Participation 결과 리스트 ( WebSocket, REALTIME )
   * @myResult : 나의 Event Participation 결과 ( HTTP, ONCE )
   */
  const [isDrawing, setIsDrawing] = useState(false);
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const [eventInfo, setEventInfo] = useState<EventRoomInfo>();
  const [prizeList, setPrizeList] = useState<PrizeInfo[]>([]);
  const [messages, setMessages] = useState<EventRoomMessageInfo[]>([]);
  const [eventStatus, setEventStatus] = useState<EventRoomCurrentInfo>();
  const [untilMyResult, setUntilMyResult] = useState<EventRoomResultViewInfo[]>([]);
  const [eventResult, setEventResult] = useState<EventRoomResultViewInfo[]>([]);
  const [myResult, setMyResult] = useState<EventRoomResultViewInfo>({
    eventId: 0,
    memberId: 0,
    ranking: 0,
    isWinner: false,
    joinedAt: '',
    isMine: false,
    winnerName: '',
    prize: undefined,
    timeDifference: '',
  });

  // IMP : ChatRoom의 크기를 확장하는 Method & Styles
  const toggleChatSize = () => setIsChatExpanded(!isChatExpanded);
  const getStatusAreaWidth = () => {
    if (isDrawing) return 'w-2/3';
    return isChatExpanded ? 'w-1/2' : 'w-2/3';
  };
  const getChatRoomAreaWidth = () => {
    if (isDrawing) return 'w-1/3';
    return isChatExpanded ? 'w-1/2' : 'w-1/3';
  };

  // IMP : Ranking에 따른 Prize 정보를 가져오는 Method
  const findPrizeByRanking = (ranking: number) => {
    return prizeList.find((prize) => prize.ranking === ranking);
  };

  // IMP : 나를 포함한 Event Participation 결과 이전의 리스트를 가져오는 Method
  // ! eventParticipate API는 요청자의 myRanking을 Params로 받아내지 않기에, Data 정합성 위험이 존재함
  // ! 정말 요청 시점에, 나보다 빠른 Ranking을 정확하게 가져올 수 있을까? 에 대한 의문
  const getUntilMyResult = async (eventId: number) => {
    if (!eventInfo) return;
    try {
      const myResult = await eventParticipate({ eventId, memberId: member.memberId });
      const prize = findPrizeByRanking(myResult.ranking);
      const timeDifference = calculateTimeDifferenceWithMilliseconds(
        eventInfo.eventTime,
        myResult.joinedAt
      );
      const processedMyResult = { ...myResult, isMine: true, prize, timeDifference };
      const frontResults = await getFrontEventParticipationInfo(Number(eventId));
      // ! 요청자의 실제 Ranking보다 더 늦은 Ranking을 가진 결과를 가져올 Risk가 존재하기에, Filtering을 통해 처리
      const processedFrontResults = frontResults
        .filter((result) => result.ranking < myResult.ranking)
        .map((result) => ({
          ...result,
          isMine: false,
          prize: findPrizeByRanking(result.ranking),
          timeDifference: calculateTimeDifferenceWithMilliseconds(
            eventInfo.eventTime,
            result.joinedAt
          ),
        }));
      // IMP : 내 결과를 포함한 이전 결과 리스트를 설정
      setUntilMyResult([...processedFrontResults, processedMyResult]);
      setMyResult(processedMyResult);
    } catch (error) {
      console.error('Error fetching event results:', error);
    }
  };

  // IMP : WebSocket을 통해 받은 Event Participation의 결과 Array를 처리하는 Method
  // ! EventRoom의 결과는 실시간으로 받아오기 때문에, 기존의 결과 리스트에 추가하는 방식으로 처리
  // ! 하지만 이전 결과 리스트와 중복되는 결과가 존재할 수 있음
  // ! 또한, myResult보다 뒤에 것들이 존재하는 모든 List를 Hook을 사용하는 측에 넘겨버리는 비효율이 존재함
  // const getEventResult = (receivedEachEventResult: EventRoomResultInfo[]) => {
  //   const processedResults = receivedEachEventResult.map((result) => {
  //     const prize = findPrizeByRanking(result.ranking);
  //     return { ...result, isMine: false, prize };
  //   });
  //   setEventResult((prevResult) => [...prevResult, ...processedResults]);
  // };

  // IMP : WebSocket을 통해 받은 Event Participation의 결과 Array를 처리하는 Method ( Recent )
  // ! 그냥 WebSocket을 통해 받은 결과를 그대로 처리하는 방식으로 변경 => 항상 최신 결과만 Hook을 사용하는 Component에 넘김
  // TODO : 이렇게 된다면, 현재 얼마나 처리되었는 지 파악하기 어려워짐. ( WebSocket을 통해 가져오는 것이 계속 초기화 되기 때문임 )
  const getEventResult = (receivedEachEventResult: EventRoomResultInfo[]) => {
    if (!eventInfo) return;
    const processedResults = receivedEachEventResult.map((result) => {
      const prize = findPrizeByRanking(result.ranking);
      return {
        ...result,
        isMine: false,
        prize,
        timeDifference: calculateTimeDifferenceWithMilliseconds(
          eventInfo.eventTime,
          result.joinedAt
        ),
      };
    });
    setEventResult(processedResults);
  };

  // IMP : EventRoom을 나가게 되는 모든 상황에 대해, WebSocket을 해제합니다. ( 새로고침, 페이지 이탈 등 )
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const { id: eventId } = params as { id: string };
      WebsocketAPI.disconnectFromEvent(Number(eventId));
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [params]);

  return {
    messages,
    myResult,
    isDrawing,
    eventInfo,
    eventStatus,
    eventResult,
    untilMyResult,
    setIsDrawing,
    toggleChatSize,
    getUntilMyResult,
    getStatusAreaWidth,
    getChatRoomAreaWidth,
  };
};
