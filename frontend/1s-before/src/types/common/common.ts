import { PopularEventTypes } from '@/types/home';

export interface ToggleProps {
  toggle: boolean;
  handleToggle: () => void;
}

export interface PageParamsType {
  size: number;
  page: number;
}

interface SliceDetails {
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
  fetchData: ({ size, page }: PageParamsType) => Promise<T>;
  initialPage?: number;
}
