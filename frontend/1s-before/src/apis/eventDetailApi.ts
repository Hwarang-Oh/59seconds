import api from '@/apis/commonAPI';
import { isAxiosError } from 'axios';
import { EventData, UnlockRoomResponse, UnlockRoomRequest } from '@/types/eventDetail';
const EVENT_DETAIL_URL = '/rooms';

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

export const postRoomUnlock = async (
  roomId: number,
  enterCode: string
): Promise<UnlockRoomResponse | null> => {
  try {
    const response = await api.post<UnlockRoomResponse>(
      `${EVENT_DETAIL_URL}/${roomId}/unlock`,
      { enterCode } as UnlockRoomRequest,
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data;
  } catch (error) {
    console.error('Error unlocking room:', error);
    return null;
  }
};
