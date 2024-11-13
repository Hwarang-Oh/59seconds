import api from '@/apis/commonAPI';
import { isAxiosError } from 'axios';
import { DeadlineEventTypes } from '@/types/home';
import { EventParticipation } from '@/types/eventRoom';
import { WinnerUserInfo, WinnerInfo } from '@/types/user';
import { PageParamsType, PageType, SliceDetails } from '@/types/common/common';
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

export const getCreatorBanner = async (memberId: number): Promise<string> => {
  try {
    const response = await api.get(`${EVENT_URL}/my-latest-banner`, {
      params: { memberId },
    });
    console.log(response.data);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) throw new Error('Not Found');
      else throw error;
    } else throw error;
  }
};

export const eventParticipate = async ({
  eventId,
  memberId,
}: Readonly<EventParticipation>) => {
  try {
    const response = await api.post(EVENT_PARTICIPATION_URL, {
      eventId,
      memberId,
    });
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
    const sliceDetails: SliceDetails = {
      hasNext: !response.data.last,
      currentPage: response.data.pageable.pageNumber,
      hasFirst: response.data.first,
    };
    return {
      ...response.data,
      sliceDetails,
    };
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

export const postWinnerUserInfo = async (
  roomId: number,
  userInfo: WinnerUserInfo
) => {
  try {
    const response = await api.post(
      `${EVENT_URL}/${roomId}/userInfo`,
      userInfo
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error.message);
    }
  }
};

export const getWinnerInfo = async (roomId: number, winnerInfo: WinnerInfo) => {
  try {
    const response = await api.post(
      `${EVENT_URL}/${roomId}/winners`,
      winnerInfo
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error.message);
    }
  }
};
