export interface LargeBannerProps {
  id: number;
  image: string;
  rectImage: string;
  title: string;
  content: string;
  date: string;
}

export interface MiniBannerProps {
  id?: number;
  rectImage: string;
  isSelected: boolean;
  onClick: () => void;
}

export interface BannerCarouselProps {
  Banners: LargeBannerProps[];
}

export interface NormalBannerProps {
  id: number;
  image: string;
  title: string;
  details: string;
  date: string;
  participants: number;
  isDeadline: boolean;
}

export interface NormalBannerListProps {
  Banners: NormalBannerProps[];
}

export interface CardBannerProps {
  id?: number;
  image: string;
  title: string;
  leftTime: string;
  details: string;
}

export interface ParticipantButtonProps {
  participants: number;
}
