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

  const fetchParticipatedRoomData = async () => {
    try {
      const partRoomsData = await fetchParticipatedRooms(1);
      setParticipatedRooms(partRoomsData);
    } catch (err) {
      setError('참여한 방 데이터를 가져오는 중 오류가 발생했습니다.');
    }
  };

  const fetchCreatedRoomData = async () => {
    try {
      const createdRoomsData = await fetchCreatedRooms(1);
      setCreatedRooms(createdRoomsData);
    } catch (err) {
      setError('개설한 방 데이터를 가져오는 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchParticipatedRoomData(); // 참여한 방 데이터 로드
    fetchCreatedRoomData(); // 생성한 방 데이터 로드
    setLoading(false);
  }, []);

  return {
    participatedRooms,
    createdRooms,
    loading,
    error,
  };
}
