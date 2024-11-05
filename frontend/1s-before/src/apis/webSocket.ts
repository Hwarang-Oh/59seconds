import { Client } from '@stomp/stompjs';
import {
  eventSocketProps,
  EventRoomCurrentInfoSubscription,
  EventRoomMessageSubscription,
} from '@/types/eventRoom';

let stompClient: Client | null = null;
let subscriptionMap = new Map();

const connect = ({
  eventId,
  onEventRoomInfoReceived,
  onMessageReceived,
  subscriptions,
}: Readonly<eventSocketProps>) => {
  if (stompClient && stompClient.connected) {
    console.log('Already Connected, Adding New subscription');
    addSubscription({ eventId, onEventRoomInfoReceived, onMessageReceived, subscriptions });
  } else {
    stompClient = new Client({
      brokerURL: 'ws://localhost:8080/api/vi/ws',
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log('Connected : ' + frames);
        addSubscription({ eventId, onEventRoomInfoReceived, onMessageReceived, subscriptions });
      },
    });
    stompClient.activate();
  }
};

const addSubscription = ({
  eventId,
  onEventRoomInfoReceived,
  onMessageReceived,
  subscriptions,
}: Readonly<eventSocketProps>) => {
  subscriptions.forEach((subscription) => {
    switch (subscription) {
      case 'eventRoomInfo':
        addEventRoomInfoSubscription({ eventId, onEventRoomInfoReceived });
        break;
      case 'eventRoomMessage':
        addEventRoomMessageSubscription({ eventId, onMessageReceived });
        break;
      default:
        console.warn('Invalid Subscription Type');
    }
  });
};

const addEventRoomInfoSubscription = ({
  eventId,
  onEventRoomInfoReceived,
}: Readonly<EventRoomCurrentInfoSubscription>) => {
  const eventRoomKey = `eventRoomInfo-${eventId}`;
  if (!subscriptionMap.has(eventRoomKey)) {
    const eventRoomInfoSubscription = stompClient.subscribe(
      `/chat/sub/room/${eventId}/count`,
      (message) => {
        onEventRoomInfoReceived(JSON.parse(message.body));
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
  if (!subscriptionMap.has(eventRoomMessageKey)) {
    const eventRoomMessageSubscription = stompClient.subscribe(
      `/chat/sub/${eventId}`,
      (message) => {
        onMessageReceived(JSON.parse(message.body));
      }
    );
    subscriptionMap.set(eventRoomMessageKey, eventRoomMessageSubscription);
  }
};

const sendEventRoomMessage = (eventId: number, message: string) => {
  stompClient.publish({
    destination: `/chat/pub/${eventId}`,
    body: JSON.stringify({ content: message }),
  });
};
