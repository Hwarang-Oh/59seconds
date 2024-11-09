import { useEffect, useState } from 'react';
import { fetchParticipatedRooms, fetchCreatedRooms } from '@/apis/memberAPI';
import { ParticipatedRoom, CreatedRoom } from '@/types/user';

export function useEventRoom() {
  // 참여한 방과 생성한 방 데이터 상태 정의
  const [participatedRooms, setParticipatedRooms] = useState<
    ParticipatedRoom[]
  >([]);
  const [createdRooms, setCreatedRooms] = useState<CreatedRoom[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRoomData = async () => {
    setLoading(true);
    try {
      const partRoomsData = await fetchParticipatedRooms(1);
      setParticipatedRooms(partRoomsData);

      const createdRoomsData = await fetchCreatedRooms(1);
      setCreatedRooms(createdRoomsData);

      setError(null);
    } catch (err) {
      setError('데이터를 가져오는 중 오류 발생');
      console.error('Error fetching room data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoomData();
  }, []);

  return {
    participatedRooms,
    createdRooms,
    loading,
    error,
  };
}
