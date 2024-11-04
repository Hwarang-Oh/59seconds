export interface LargeBannerProps {
  id?: string;
  image: string;
  title: string;
  content: string;
  date: string;
}

export interface NormalBannerProps {
  id?: string;
  image: string;
  title: string;
  details: string;
  date: string;
  participants: number;
  isDeadline: boolean;
}

export interface CardBannerProps {
  id?: string;
  image: string;
  title: string;
  leftTime: string;
  details: string;
}

export interface MiniBannerProps {
  id?: string;
  image: string;
}
