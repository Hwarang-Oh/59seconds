import { Client } from '@stomp/stompjs';
import {
  eventSocketProps,
  EventRoomMessageInfo,
  EventRoomResultSubscription,
  EventRoomMessageSubscription,
  EventRoomCurrentInfoSubscription,
} from '@/types/eventRoom';

let stompClient: Client | null = null;
let subscriptionMap = new Map();

const connect = ({
  eventId,
  onEventRoomResultReceived,
  onEventRoomInfoReceived,
  onMessageReceived,
  subscriptions,
}: Readonly<eventSocketProps>) => {
  if (stompClient?.connected) {
    console.log('Already Connected, Adding New subscription');
    addSubscription({
      eventId,
      onEventRoomResultReceived,
      onEventRoomInfoReceived,
      onMessageReceived,
      subscriptions,
    });
  } else {
    stompClient = new Client({
      brokerURL: 'ws://localhost:8080/api/v1/ws',
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log('Connected : ');
        addSubscription({
          eventId,
          onEventRoomResultReceived,
          onEventRoomInfoReceived,
          onMessageReceived,
          subscriptions,
        });
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
}: Readonly<eventSocketProps>) => {
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

export default {
  connect,
  sendEventRoomMessage,
};
