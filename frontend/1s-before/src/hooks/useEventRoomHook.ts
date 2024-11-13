import WebsocketAPI from '@/apis/webSocket';
import { useEffect, useState } from 'react';
import { useMemberStore } from '@/store/memberStore';
import { fetchEventInfo } from '@/apis/eventDetailApi';
import { useParams } from 'next/navigation';
import {
  EventRoomInfo,
  EventRoomCurrentInfo,
  EventRoomMessageInfo,
  EventRoomResultInfo,
  EventRoomResultViewInfo,
} from '@/types/eventRoom';

export const useEventRoom = () => {
  const params = useParams();
  const member = useMemberStore((state) => state.member);
  const setMember = useMemberStore((state) => state.setMember);
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [myResult, setMyResult] = useState<EventRoomResultViewInfo>({
    eventId: 0,
    memberId: 0,
    joinedAt: '',
    ranking: 0,
    isWinner: false,
    isMine: false,
  });
  const [eventInfo, setEventInfo] = useState<EventRoomInfo | null>(null);
  const [messages, setMessages] = useState<EventRoomMessageInfo[]>([]);
  const [eventStatus, setEventStatus] = useState<EventRoomCurrentInfo | null>(null);
  const [eventResult, setEventResult] = useState<EventRoomResultViewInfo[]>([]);

  // URL 파라미터 처리를 위한 useEffect
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const { id: eventId } = params as { id: string };
    const memberData = urlParams.get('memberData');

    if (memberData) {
      const parsedMemberData = JSON.parse(decodeURIComponent(memberData));
      const { memberId, nickname, isCreatorMode } = parsedMemberData.state.member;
      setMember(memberId, nickname, isCreatorMode);
    }

    if (eventId) {
      fetchEventInfo(Number(eventId)).then((eventInfo) => {
        console.log(eventInfo);
        setEventInfo({
          eventId: Number(eventId),
          creatorName: eventInfo.memberResponseDto.creatorName,
          title: eventInfo.title,
          winnerNum: eventInfo.winnerNum,
          eventTime: eventInfo.endTime,
          bannerImage: eventInfo.bannerImage,
        });
      });

      WebsocketAPI.connect({
        eventId: Number(eventId),
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

  const getEventResult = (receivedEachEventResult: EventRoomResultInfo) => {
    const isMine = member ? receivedEachEventResult.memberId === member.memberId : false;
    const processedResult = { ...receivedEachEventResult, isMine };
    if (isMine) setMyResult(processedResult);
    setEventResult((prevResult) => [...prevResult, processedResult]);
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
    eventInfo,
    messages,
    eventStatus,
    eventResult,
    myResult,
    isDrawing,
    toggleChatSize,
    getStatusAreaWidth,
    getChatRoomAreaWidth,
    setIsDrawing,
  };
};
