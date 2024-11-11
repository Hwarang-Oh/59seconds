import api from '@/apis/commonAPI';
import { isAxiosError } from 'axios';
import { DeadlineEventTypes } from '@/types/home';
import { EventParticipation } from '@/types/eventRoom';
import { PageParamsType, PageType } from '@/types/common/common';
const EVENT_URL = 'v1/rooms';
const EVENT_PARTICIPATION_URL = 'v1/participations';

export const createEvent = async (eventData: FormData) => {
  try {
    const response = await api.post(EVENT_URL, eventData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Error while creating event:', error);
    throw error;
  }
};

export const eventParticipate = async ({ eventId, memberId }: Readonly<EventParticipation>) => {
  try {
    const response = await api.post(EVENT_PARTICIPATION_URL, { eventId, memberId });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error.message);
    }
  }
};

export const getPopularEvents = async ({
  size = 10,
  page = 0,
}: PageParamsType): Promise<PageType> => {
  try {
    const response = await api.get(`${EVENT_URL}/popular`, {
      params: { size, page },
    });
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) throw new Error('Not Found');
      else throw error;
    } else throw error;
  }
};

export const getDeadlineEvents = async (): Promise<DeadlineEventTypes[]> => {
  try {
    const response = await api.get(`${EVENT_URL}/deadline`);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) throw new Error('Not Found');
      else throw error;
    } else throw error;
  }
};
