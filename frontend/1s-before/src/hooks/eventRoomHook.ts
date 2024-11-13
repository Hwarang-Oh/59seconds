import { useEffect, useState } from 'react';
import { useMemberStore } from '@/store/memberStore';
import { ParticipatedRoom, CreatedRoom } from '@/types/user';
import { fetchParticipatedRooms, fetchCreatedRooms } from '@/apis/memberAPI';

export function useEventRoom() {
  const { member } = useMemberStore();
  // IMP: 참여한 방과 생성한 방 데이터 상태 정의
  const [participatedRooms, setParticipatedRooms] = useState<
    ParticipatedRoom[]
  >([]);
  const [createdRooms, setCreatedRooms] = useState<CreatedRoom[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 참여한 이벤트 총 횟수와 우승 횟수 상태 정의
  const [totalParticipatedCount, setTotalParticipatedCount] =
    useState<number>(0);
  const [totalWinsCount, setTotalWinsCount] = useState<number>(0);

  const fetchParticipatedRoomData = async () => {
    try {
      const partRoomsData = await fetchParticipatedRooms(member?.memberId ?? 0);
      setParticipatedRooms(partRoomsData);

      setTotalParticipatedCount(partRoomsData.length);
      setTotalWinsCount(partRoomsData.filter((room) => room.isWinner).length);
    } catch (err) {
      setError('참여한 방 데이터를 가져오는 중 오류가 발생했습니다.');
    }
  };

  const fetchCreatedRoomData = async () => {
    try {
      const createdRoomsData = await fetchCreatedRooms(member?.memberId ?? 0);
      setCreatedRooms(createdRoomsData);
    } catch (err) {
      setError('개설한 방 데이터를 가져오는 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    if (member) {
      setLoading(true);
      fetchParticipatedRoomData();
      fetchCreatedRoomData();
      setLoading(false);
    }
  }, [member]);

  return {
    error,
    loading,
    createdRooms,
    totalWinsCount,
    participatedRooms,
    totalParticipatedCount,
  };
}
