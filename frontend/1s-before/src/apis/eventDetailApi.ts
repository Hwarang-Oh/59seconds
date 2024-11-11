import api from '@/apis/commonAPI';
import { isAxiosError } from 'axios';
import { EventData } from '@/types/eventDetail';
const EVENT_DETAIL_URL = '/v1/rooms';

export const fetchEventInfo = async (roomId: number): Promise<EventData> => {
  try {
    const response = await api.get<EventData>(`${EVENT_DETAIL_URL}/${roomId}`);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) throw new Error('Not Found');
      else throw error;
    } else throw error;
  }
};
