/**
 * IMP : 인기 Event 받아오는 Type
 */
export interface PopularEventTypes {
  eventId: number;
  title: string;
  ranking: number; // Type: index로 자체 가능
  description: string;
  endTime: string;
  mainPrize: string;
  prizeCount: number;
  unlockCount: number;
  isDeadline: boolean;
  bannerImage: string;
  rectangleImage: string;
}

/**
 * IMP : 마감 임박 Event 받아오는 Type
 */
export interface DeadlineEventTypes {
  eventId: number;
  title: string;
  leftTime: string; // Type: endTime이 있다면, 자체 가능
  mainPrize: string;
  prizeCount: number;
  rectangleImage: string;
}

/**
 * IMP : 크리에이터가 만든 Event를 받아오는 Type
 */
export interface CreatorEventTypes {
  eventId: number;
  title: string;
  status: string;
  unlockCount: number;
  endTime: string; // Type: endTime이 있다면, 자체 가능
  rectangleUrl: string;
}

export interface CreatorCardListProps {
  Banners: CreatorEventTypes[];
}

/**
 * IMP : General Mode Page Type 정의
 */

export interface LargeBannerProps {
  eventId: number;
  title: string;
  description: string;
  endTime: string;
  bannerImage: string;
  rectangleImage: string;
}

export interface NormalBannerProps {
  eventId: number;
  title: string;
  ranking: number; // Type : index로 자체 가능
  endTime: string;
  unlockCount: number;
  isDeadline: boolean;
  mainPrize: string;
  prizeCount: number;
  rectangleImage: string;
}

export interface ParticipantButtonProps {
  unlockCount: number;
}

export interface CardBannerProps {
  eventId: number;
  title: string;
  leftTime: string; // Type: endTime이 있다면, 자체 가능
  mainPrize: string;
  prizeCount: number;
  rectangleImage: string;
}

export interface BannerCarouselProps {
  Banners: LargeBannerProps[];
}

export interface NormalBannerListProps {
  Banners: NormalBannerProps[];
}

export interface CardBannerListProps {
  Banners: CardBannerProps[];
}

/**
 * IMP : Creator Mode Page Type 정의
 */
export interface CreatorBannerProps {
  bannerImage: string;
}

/**
 * IMP : 공통 Mode Page Type 정의
 */
export interface HomeContentProps {
  popularEvents: PopularEventTypes[];
  deadlineEvents: CardBannerProps[];
}

export interface FancyCardProps {
  id: number;
  title: string;
  content: string;
}
