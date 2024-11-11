/**
 * IMP : API Type 정의
 */

/**
 * IMP : 인기 Event 받아오는 Type
 */
export interface PopularEventTypes {
  winnerNum: number;
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
 * IMP : 인플루언서가 만든 Event를 받아오는 Type
 */
export interface InfluencerEventTypes {
  eventId: number;
  title: string;
  status: string;
  participantCount: number;
  leftTime: string; // Type: endTime이 있다면, 자체 가능
}

/**
 * IMP : Page Type 정의
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

export interface FancyCardProps {
  id: number;
  title: string;
  content: string;
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
