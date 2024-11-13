export interface CreatorData {
  participateName: string;
  creatorName: string;
  address: string;
  phone: string;
  profileImage: string;
  creatorIntroduce: string;
  snsLink: string;
}

export interface Prize {
  prizeId: number;
  roomId: number;
  prizeType: string;
  winnerCount: number;
  prizeName: string;
  ranking: number;
}

export interface EventData {
  memberResponseDto: CreatorData;
  title: string;
  description: string;
  status: string;
  startTime: string;
  endTime: string;
  winnerNum: number;
  enterCode: string;
  unlockCount: number;
  bannerImage: string;
  squareImage: string;
  rectangleImage: string;
  createdAt: string;
  prizes: Prize[];
}
export interface EventIntroTabProps {
  event: EventData;
  creator: CreatorData;
  id: number;
}

export interface UnlockRoomResponse {
  success: boolean;
  message: string;
}
export interface UnlockRoomRequest {
  enterCode: string;
}
