import { useEffect, useState } from 'react';
import { useMemberStore } from '@/store/memberStore';
import { ParticipatedRoom, CreatedRoom } from '@/types/user';
import { fetchParticipatedRooms, fetchCreatedRooms } from '@/apis/memberAPI';

export function useEventRoom() {
  const { member } = useMemberStore();
  // IMP: 참여한 방과 생성한 방 데이터 상태 정의

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [createdRooms, setCreatedRooms] = useState<CreatedRoom[]>([]);
  const [participatedRooms, setParticipatedRooms] = useState<ParticipatedRoom[]>([]);

  // IMP: 참여한 이벤트 총 횟수와 우승 횟수 상태 정의
  const [totalParticipatedCount, setTotalParticipatedCount] = useState<number>(0);
  const [totalWinsCount, setTotalWinsCount] = useState<number>(0);

  const fetchParticipatedRoomData = async () => {
    try {
      const partRoomsData = await fetchParticipatedRooms(member?.memberId ?? 0);
      setParticipatedRooms(partRoomsData);

      setTotalParticipatedCount(partRoomsData.length);
      setTotalWinsCount(partRoomsData.filter((room) => room.winner).length);
    } catch (err) {
      setError('참여한 방 데이터를 가져오는 중 오류가 발생했습니다.');
    }
  };

  // IMP: 생성한 방 정보 가져오기
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

  // IMP: 팝업 열기
  const openPopup = (roomId: number) => {
    setSelectedRoom(roomId);
    setIsPopupOpen(true);
  };

  // IMP: 팝업 닫기
  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedRoom(null);
  };

  return {
    error,
    loading,
    isPopupOpen,
    selectedRoom,
    createdRooms,
    totalWinsCount,
    participatedRooms,
    totalParticipatedCount,
    openPopup,
    closePopup,
  };
}
