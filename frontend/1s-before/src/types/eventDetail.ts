export interface EventData {
  eventInfo: {
    title: string;
    description: string;
    bannerImage: string;
    rectImage: string;
  };
  productsOrCoupons: {
    order: number;
    type: string;
    name: string;
    recommendedPeople: number;
  }[];
  eventPeriod: {
    start: string;
    end: string;
  };
  participationCode: string;
}

export interface CreatorData {
  id: number;
  creatorName: string;
  profileImage: string;
  creatorIntroduce: string;
}

export interface EventIntroTabProps {
  event: EventData;
  creator: CreatorData;
  id: number;
}
