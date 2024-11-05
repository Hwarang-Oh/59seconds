export interface EventRoomInfo {
  id: number;
  title: string;
  bannerImage: string;
  eventTime: string;
}

export interface BannerHeaderProps {
  bannerImage: string;
}

export interface EventStatusProps {
  participants: number;
  competitionRate: number;
  eventTime: string;
}

export interface CountdownTimerProps {
  eventTime: string;
}
