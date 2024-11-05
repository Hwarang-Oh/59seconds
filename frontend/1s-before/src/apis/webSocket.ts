import { Client } from '@stomp/stompjs';

let stompClient = null;
let subscriptionMap = new Map();

const connect = ({ eventId, onMessageReceived }) => {
  stompClient = new Client({
    brokerURL: 'ws://localhost:8080/api/vi/ws',
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    onConnect: () => {
      console.log('Connected : ' + frameElement);
    },
  });
  stompClient.activate();
};
