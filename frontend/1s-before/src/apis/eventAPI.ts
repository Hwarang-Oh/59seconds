import api from '@/apis/commonAPI';
import { isAxiosError } from 'axios';
import { DeadlineEventTypes } from '@/types/home';
import { EventParticipation, EventRoomResultInfo } from '@/types/eventRoom';
import { WinnerUserInfo, WinnerInfo } from '@/types/user';
import { PageParamsType, PageType, SliceDetails } from '@/types/common/common';
const EVENT_URL = '/rooms';
const EVENT_PARTICIPATION_URL = '/participations';

export const createEvent = async (eventData: FormData) => {
  try {
    const response = await api.post(EVENT_URL, eventData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('이벤트 생성 중 오류가 발생했습니다:', error);
    throw error;
  }
};

export const getCreatorBanner = async (memberId: number): Promise<string> => {
  try {
    const response = await api.get(`${EVENT_URL}/my-latest-banner`, {
      params: { memberId },
    });
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
}: Readonly<EventParticipation>): Promise<EventRoomResultInfo> => {
  try {
    const response = await api.post(EVENT_PARTICIPATION_URL, {
      eventId,
      memberId,
    });
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) throw new Error('Not Found');
      else throw error;
    } else throw error;
  }
};

export const getFrontEventParticipationInfo = async (
  eventId: number
): Promise<EventRoomResultInfo[]> => {
  try {
    const response = await api.get(
      `${EVENT_PARTICIPATION_URL}/${eventId}/result`
    );
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) throw new Error('Not Found');
      else throw error;
    } else throw error;
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
      `${EVENT_URL}/${roomId}/userinfo`,
      userInfo
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error.message);
    }
  }
};

export const getWinnerInfo = async (roomId: number) => {
  try {
    const response = await api.get(`${EVENT_URL}/${roomId}/winners`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error.message);
    }
  }
};
