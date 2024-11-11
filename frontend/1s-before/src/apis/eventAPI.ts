import axios, { isAxiosError } from 'axios';
import { EventParticipation } from '@/types/eventRoom';

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/v1`;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const createEvent = async (eventData: FormData) => {
  try {
    const response = await api.post('/rooms', eventData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data; // roomId
  } catch (error) {
    console.error('Error while creating event:', error);
    throw error;
  }
};

const URL = 'https://k11a404.p.ssafy.io/api/v1/participations';
export const eventParticipate = async ({ eventId, memberId }: Readonly<EventParticipation>) => {
  try {
    const response = await axios.post(URL, { eventId, memberId });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error.message);
    }
  }
};
