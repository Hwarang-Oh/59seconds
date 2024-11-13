export interface UserData {
  participateName: string;
  creatorName: string;
  address: string;
  phone: string;
  profileImage: string | File;
  creatorIntroduce: string;
  snsLink: string;
}

export interface ParticipatedRoom {
  eventId: number;
  ranking: number;
  isWinner: boolean;
  prizeType: string;
  prizeName: string;
  title: string;
  bannerImage: string;
  totalParticipants: number;
  startTime: string;
}

export interface CreatedRoom {
  eventId: number;
  title: string;
  status: string;
  startTime: string;
  endTime: string;
  enterCode: string;
  unlockCount: number;
  bannerUrl: string;
  rectangleUrl: string;
  createdAt: string;
}

interface Winner {
  winnerName: string;
  address: string;
  phone: string;
  ranking: number;
}

export interface WinnerUserInfo {
  memberId: number;
  winnerName: string;
  address: string;
  phone: string;
  ranking: number;
}

export interface WinnerInfo {
  winners: Winner[];
  message: string;
  success: boolean;
}
