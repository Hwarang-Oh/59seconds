import WebsocketAPI from '@/apis/webSocket';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useMemberStore } from '@/store/memberStore';
import { fetchEventInfo } from '@/apis/eventDetailApi';
import { createPrizeRankingList } from '@/utils/prizeUtils';
import { eventParticipate, getFrontEventParticipationInfo } from '@/apis/eventAPI';
import {
  PrizeInfo,
  EventRoomInfo,
  EventRoomCurrentInfo,
  EventRoomMessageInfo,
  EventRoomResultInfo,
  EventRoomResultViewInfo,
} from '@/types/eventRoom';

export const useEventProgress = () => {
  const params = useParams();
  let memberData;
  let eventId: string;
  const { member, setMember } = useMemberStore();
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
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
  });

  const currentProcessed = eventResult.length;
  const competitionRate =
    eventInfo && eventStatus ? (eventStatus.userCount ?? 0) / eventInfo.winnerNum : 0;

  // URL 파라미터 처리를 위한 useEffect
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    memberData = urlParams.get('memberData');
    eventId = params?.id as string;
    if (memberData && eventId) {
      const parsedMemberData = JSON.parse(decodeURIComponent(memberData));
      const { memberId, nickname, isCreatorMode } = parsedMemberData.state.member;
      setMember(memberId, nickname, isCreatorMode);
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
      WebsocketAPI.connect({
        eventId: Number(eventId),
        memberId: memberId,
        onEventRoomInfoReceived: (eventRoomInfo) => setEventStatus(eventRoomInfo),
        onMessageReceived: (messageInfo) =>
          setMessages((prevMessages) => [...prevMessages, messageInfo]),
        onEventRoomResultReceived: (eventRoomResult) => getEventResult(eventRoomResult),
        subscriptions: ['eventRoomInfo', 'eventRoomMessage', 'eventRoomResult'],
      });
      return () => {
        console.log('Cleaning up WebSocket connection for event:', eventId);
        WebsocketAPI.disconnectFromEvent(Number(eventId));
      };
    }
  }, [params]);

  const toggleChatSize = () => setIsChatExpanded(!isChatExpanded);

  const getStatusAreaWidth = () => {
    if (isDrawing) return 'w-2/3';
    return isChatExpanded ? 'w-1/2' : 'w-2/3';
  };

  const getChatRoomAreaWidth = () => {
    if (isDrawing) return 'w-1/3';
    return isChatExpanded ? 'w-1/2' : 'w-1/3';
  };

  const findPrizeByRanking = (ranking: number) => {
    return prizeList.find((prize) => prize.ranking === ranking);
  };

  const getUntilMyResult = async (eventId: number) => {
    try {
      const myResult = await eventParticipate({ eventId, memberId: member.memberId });
      const prize = findPrizeByRanking(myResult.ranking);
      const processedMyResult = { ...myResult, isMine: true, prize };
      const frontResults = await getFrontEventParticipationInfo(Number(eventId));
      const processedFrontResults = frontResults
        .filter((result) => result.ranking < myResult.ranking) // 내 순위 이전 데이터만 포함
        .map((result) => ({
          ...result,
          isMine: false,
        }));
      setUntilMyResult([...processedFrontResults, processedMyResult]);
      setMyResult(processedMyResult);
    } catch (error) {
      console.error('Error fetching event results:', error);
    }
  };

  const getEventResult = (receivedEachEventResult: EventRoomResultInfo[]) => {
    const processedResults = receivedEachEventResult.map((result) => {
      const prize = findPrizeByRanking(result.ranking);
      return { ...result, isMine: false, prize };
    });
    setEventResult((prevResult) => [...prevResult, ...processedResults]);
  };

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
    competitionRate,
    currentProcessed,
    toggleChatSize,
    getStatusAreaWidth,
    getChatRoomAreaWidth,
    getUntilMyResult,
    setIsDrawing,
  };
};
