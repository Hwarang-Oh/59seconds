import { Prize } from '@/types/eventDetail';
import { PrizeInfo } from '@/types/eventRoom';

export function createPrizeRankingList(prizes: Prize[]): PrizeInfo[] {
  const list: PrizeInfo[] = [];
  prizes.forEach((prize) => {
    for (let i = 0; i < prize.winnerCount; i++) {
      list.push({
        ranking: list.length + 1,
        eventId: prize.roomId,
        prizeId: prize.prizeId,
        prizeType: prize.prizeType,
        prizeName: prize.prizeName,
      });
    }
  });
  return list;
}
