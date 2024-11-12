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
  const { id: eventId } = params as { id: string };
  const { member } = useMemberStore();

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
    if (eventId) {
      fetchEventInfo(Number(eventId)).then((eventInfo) => {
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
    }

    return () => {
      console.log('Cleaning up WebSocket connection for event:', eventId);
      WebsocketAPI.disconnectFromEvent(Number(eventId));
    };
  }, [eventId]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      WebsocketAPI.disconnectFromEvent(Number(eventId));
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [eventId]);

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
