import { Prize } from '@/types/eventDetail';
/**
 * IMP : Event Room Page Component에서 사용하는 Type 정의
 */
export interface EventRoomInfo {
  eventId: number;
  creatorName: string;
  title: string;
  winnerNum: number;
  eventTime: string;
  bannerImage: string;
  prizes: Prize[];
}

export interface BannerHeaderProps {
  bannerImage: string;
}

export interface EventStatusAreaProps {
  eventId: number;
  eventTime: string;
  isDrawing: boolean;
  competitionRate: number;
  totalParticipants: number;
  currentProccessed: number;
  myResult: EventRoomResultViewInfo;
  goDrawView: () => void;
  getMyEventResult: (eventId: number) => void;
}

export interface EventStatusStatsProps {
  participants: number;
  competitionRate: number;
}

export interface EventStatusView {
  isPending: boolean;
  eventId: number;
  joinedAt: string;
  ranking: number;
  isWinner: boolean;
  prize?: PrizeInfo;
  timeDifference: string;
  totalParticipants: number;
  currentProccessed: number;
}

export interface EventWinOrLoseStateView {
  eventId: number;
  isWinner: boolean;
  joinedAt: string;
  ranking: number;
  prize?: PrizeInfo;
  timeDifference: string;
}

export interface CountdownTimerProps {
  eventTime: string;
  onComplete: () => void;
}

export interface ActiveButtonProps {
  text: string;
  isDisabled: boolean;
  onClick: () => void;
}

export interface EventChatRoomAreaProps {
  eventId: number;
  participants: number;
  messages: EventRoomMessageInfo[];
  onClick: () => void;
}

export interface EventChatRoomHeaderProps {
  participants: number;
}

export interface EventChatRoomProps {
  messages: EventRoomMessageInfo[];
}

/**
 * IMP : Event Room Page에서 사용하는 API Type 정의
 */
export interface EventParticipation {
  eventId: number;
  memberId: number;
}
/**
 * IMP : Event Room Page에서 사용하는 WebSocket Type 정의
 */

// Type : Message Type 정의
interface EventRoomSubscription {
  eventId: number;
}

export interface PrizeInfo {
  ranking: number;
  eventId: number;
  prizeId: number;
  prizeType: string;
  prizeName: string;
}

export interface EventRoomCurrentInfo extends EventRoomSubscription {
  userCount: number;
}

export interface EventRoomMessageInfo extends EventRoomSubscription {
  memberId: number;
  sender: string;
  content: string;
  sentAt: string;
  isMine: boolean;
}

export interface EventRoomResultInfo extends EventRoomSubscription {
  memberId: number;
  joinedAt: string;
  ranking: number;
  isWinner: boolean;
  winnerName: string;
}

export interface EventRoomResultViewInfo extends EventRoomResultInfo {
  isMine: boolean;
  prize?: PrizeInfo;
  timeDifference: string;
}

export interface EventRoomAllResultProps {
  list: EventRoomResultViewInfo[];
  untilMyResult: EventRoomResultViewInfo[];
  myResult: EventRoomResultViewInfo;
  calculateCurrentProcessed: (processed: number) => void;
  addCalculatedCurrentProcessed: (processed: number) => void;
}

// Type : Subscription Type 정의
export interface EventRoomCurrentInfoSubscription extends EventRoomSubscription {
  onEventRoomInfoReceived: (eventRoomCurrentInfo: EventRoomCurrentInfo) => void;
}

export interface EventRoomMessageSubscription extends EventRoomSubscription {
  onMessageReceived: (messageInfo: EventRoomMessageInfo) => void;
}

export interface EventRoomResultSubscription extends EventRoomSubscription {
  onEventRoomResultReceived: (eventRoomResult: EventRoomResultInfo[]) => void;
}

export interface EventSocketProps extends EventRoomSubscription {
  memberId: number;
  onEventRoomInfoReceived: (eventRoomCurrentInfo: EventRoomCurrentInfo) => void;
  onEventRoomResultReceived: (eventRoomResult: EventRoomResultInfo[]) => void;
  onMessageReceived: (messageInfo: EventRoomMessageInfo) => void;
  subscriptions: string[];
}
