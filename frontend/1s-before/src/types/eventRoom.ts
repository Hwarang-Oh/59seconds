export interface EventRoomInfo {
  eventId: number;
  title: string;
  bannerImage: string;
  eventTime: string;
}

export interface BannerHeaderProps {
  bannerImage: string;
}

export interface EventStatusAreaProps {
  participants: number;
  competitionRate: number;
  eventTime: string;
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
}

export interface EventChatRoomHeaderProps {
  participants: number;
}

export interface EventChatRoomProps {
  messages: EventRoomMessageInfo[];
}

/**
 * IMP : Event Room Page에서 사용하는 WebSocket Type 정의
 */

// Type : Message Type 정의
interface EventRoomSubscription {
  eventId: number;
}

export interface EventRoomCurrentInfo extends EventRoomSubscription {
  userCount: number;
}

export interface EventRoomMessageInfo extends EventRoomSubscription {
  sender: string;
  content: string;
  sentAt: string;
}

// Type : Subscription Type 정의
export interface EventRoomCurrentInfoSubscription extends EventRoomSubscription {
  onEventRoomInfoReceived: (eventRoomCurrentInfo: EventRoomCurrentInfo) => void;
}

export interface EventRoomMessageSubscription extends EventRoomSubscription {
  onMessageReceived: (messageInfo: EventRoomMessageInfo) => void;
}

export interface eventSocketProps extends EventRoomSubscription {
  onEventRoomInfoReceived: (eventRoomCurrentInfo: EventRoomCurrentInfo) => void;
  onMessageReceived: (messageInfo: EventRoomMessageInfo) => void;
  subscriptions: string[];
}
