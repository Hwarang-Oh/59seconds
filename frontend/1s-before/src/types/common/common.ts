import { PopularEventTypes } from '@/types/home';

export interface ToggleProps {
  toggle: boolean;
  handleToggle: () => void;
}

export interface MemberInfo {
  memberId: number;
  nickname: string;
  creatorName: string;
}

export interface PageParamsType {
  query?: string;
  size: number;
  page: number;
}

export interface SliceDetails {
  currentPage: number;
  hasFirst: boolean;
  hasNext: boolean;
}

export interface PageType {
  sliceDetails: SliceDetails;
  content: PopularEventTypes[];
}

export interface ContentsFetchType<T extends PageType> {
  queryKey: string[];
  query?: string;
  fetchData: ({ query, size, page }: PageParamsType) => Promise<T>;
  initialPage?: number;
}

export interface RequestPopUpProps {
  roomId: number;
  prizeType: string;
  onClose: () => void;
}
