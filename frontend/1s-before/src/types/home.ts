export interface LargeBannerProps {
  id: number;
  bannerImage: string;
  rectImage: string;
  title: string;
  content: string;
  date: string;
}

export interface NormalBannerProps {
  id: number;
  rectImage: string;
  title: string;
  details: string;
  date: string;
  participants: number;
  isDeadline: boolean;
}

export interface ParticipantButtonProps {
  participants: number;
}

export interface CardBannerProps {
  id: number;
  rectImage: string;
  title: string;
  leftTime: string;
  details: string;
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
