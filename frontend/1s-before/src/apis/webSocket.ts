import { Client } from '@stomp/stompjs';
import {
  EventSocketProps,
  EventRoomMessageInfo,
  EventRoomResultSubscription,
  EventRoomMessageSubscription,
  EventRoomCurrentInfoSubscription,
} from '@/types/eventRoom';

let stompClient: Client | null = null;
let subscriptionMap = new Map();
let activeEventIds = new Set<number>();

const connect = ({
  eventId,
  onEventRoomResultReceived,
  onEventRoomInfoReceived,
  onMessageReceived,
  subscriptions,
}: Readonly<EventSocketProps>) => {
  if (stompClient?.connected) {
    console.log('Already Connected, Adding New subscription');
    addSubscription({
      eventId,
      onEventRoomResultReceived,
      onEventRoomInfoReceived,
      onMessageReceived,
      subscriptions,
    });
    if (!activeEventIds.has(eventId)) {
      sendEnterEventRoom(eventId);
      activeEventIds.add(eventId);
    }
  } else {
    stompClient = new Client({
      brokerURL: process.env.NEXT_PUBLIC_WEBSOCKET_URL,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log('Connected to ' + eventId);
        addSubscription({
          eventId,
          onEventRoomResultReceived,
          onEventRoomInfoReceived,
          onMessageReceived,
          subscriptions,
        });
        if (!activeEventIds.has(eventId)) {
          sendEnterEventRoom(eventId);
          activeEventIds.add(eventId);
        }
      },
      onDisconnect: () => {
        console.log('Disconnected');
        handleDisconnect();
      },
      onWebSocketClose: () => {
        console.log('WebSocket Closed');
        handleDisconnect();
      },
    });
    stompClient.activate();
  }
};

const addSubscription = ({
  eventId,
  onEventRoomResultReceived,
  onEventRoomInfoReceived,
  onMessageReceived,
  subscriptions,
}: Readonly<EventSocketProps>) => {
  subscriptions.forEach((subscription) => {
    switch (subscription) {
      case 'eventRoomInfo':
        addEventRoomInfoSubscription({ eventId, onEventRoomInfoReceived });
        break;
      case 'eventRoomMessage':
        addEventRoomMessageSubscription({ eventId, onMessageReceived });
        break;
      case 'eventRoomResult':
        addEventRoomResultSubscription({ eventId, onEventRoomResultReceived });
        break;
      default:
        console.warn('Invalid Subscription Type');
    }
  });
};

const addEventRoomResultSubscription = ({
  eventId,
  onEventRoomResultReceived,
}: Readonly<EventRoomResultSubscription>) => {
  const eventRoomResultKey = `eventRoomResult-${eventId}`;
  if (!subscriptionMap.has(eventRoomResultKey) && stompClient?.connected) {
    const eventRoomResultSubscription = stompClient.subscribe(
      `/result/sub/participations/${eventId}`,
      (message) => {
        onEventRoomResultReceived(JSON.parse(message.body));
      }
    );
    subscriptionMap.set(eventRoomResultKey, eventRoomResultSubscription);
  }
};

const addEventRoomInfoSubscription = ({
  eventId,
  onEventRoomInfoReceived,
}: Readonly<EventRoomCurrentInfoSubscription>) => {
  const eventRoomKey = `eventRoomInfo-${eventId}`;
  if (!subscriptionMap.has(eventRoomKey) && stompClient?.connected) {
    const eventRoomInfoSubscription = stompClient.subscribe(
      `/chat/sub/room/${eventId}/count`,
      (message) => {
        onEventRoomInfoReceived(JSON.parse(message.body));
        console.log(message.body);
      }
    );
    subscriptionMap.set(eventRoomKey, eventRoomInfoSubscription);
  }
};

const addEventRoomMessageSubscription = ({
  eventId,
  onMessageReceived,
}: Readonly<EventRoomMessageSubscription>) => {
  const eventRoomMessageKey = `eventRoomMessage-${eventId}`;
  if (!subscriptionMap.has(eventRoomMessageKey) && stompClient?.connected) {
    const eventRoomMessageSubscription = stompClient.subscribe(
      `/chat/sub/room/${eventId}`,
      (message) => {
        console.log('Received Message : ', message.body);
        onMessageReceived(JSON.parse(message.body));
      }
    );
    subscriptionMap.set(eventRoomMessageKey, eventRoomMessageSubscription);
  }
};

const sendEventRoomMessage = (eventId: number, message: EventRoomMessageInfo) => {
  if (stompClient?.connected) {
    stompClient.publish({
      destination: `/chat/pub/sendMessage/${eventId}`,
      body: JSON.stringify(message),
    });
    console.log('Sent Messsage : ', message);
  }
};

const sendEnterEventRoom = (eventId: number) => {
  if (stompClient?.connected) {
    stompClient.publish({
      destination: `/chat/pub/room/${eventId}/enter`,
      body: JSON.stringify({ eventId: eventId }),
    });
    sendEventRoomMessage(eventId, {
      eventId: eventId,
      sender: 'system',
      content: 'Entered the room',
      sentAt: new Date().toISOString(),
    });
  }
};

const sendLeaveEventRoom = (eventId: number) => {
  if (stompClient?.connected) {
    stompClient.publish({
      destination: `/chat/pub/room/${eventId}/leave`,
      body: JSON.stringify({ eventId: eventId }),
    });
  }
};

const handleDisconnect = () => {
  activeEventIds.forEach((eventId) => {
    sendLeaveEventRoom(eventId);
  });
  activeEventIds.clear();
};

const disconnectAll = () => {
  handleDisconnect();
  subscriptionMap.forEach((subscription) => subscription.unsubscribe());
  subscriptionMap.clear();
  if (stompClient?.connected) {
    stompClient.deactivate();
  }
  stompClient = null;
};

const disconnectFromEvent = (eventId: number) => {
  if (activeEventIds.has(eventId)) {
    const subscriptionKeys = Array.from(subscriptionMap.keys()).filter((key) =>
      key.endsWith(`-${eventId}`)
    );
    subscriptionKeys.forEach((key) => {
      const subscription = subscriptionMap.get(key);
      subscription?.unsubscribe();
      subscriptionMap.delete(key);
    });
    sendLeaveEventRoom(eventId);
    activeEventIds.delete(eventId);
    console.log(`Disconnected from event: ${eventId}`);
  }
  if (activeEventIds.size === 0) {
    console.log('No active events, deactivating WebSocket connection');
    stompClient?.deactivate();
    stompClient = null;
  }
};

export default {
  connect,
  disconnectFromEvent,
  disconnectAll,
  sendEventRoomMessage,
};
