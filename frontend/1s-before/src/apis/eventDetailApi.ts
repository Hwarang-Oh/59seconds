import axios from 'axios';
import { EventData } from '@/types/eventDetail';

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/v1`;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const fetchEventInfo = async (roomId: number): Promise<EventData> => {
  try {
    const response = await api.get<EventData>(`/rooms/${roomId}`);
    return response.data;
  } catch (error) {
    console.error('기존 정보 가져오기 오류:', error);
    throw error;
  }
};
