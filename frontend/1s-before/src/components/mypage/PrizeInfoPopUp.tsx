import { useEffect, useState } from 'react';
// import { getWinnerInfo } from '@/apis/eventAPI';
import eventWinner from '@/mocks/eventWinner.json';
import { CSVLink } from 'react-csv';
import { AiOutlineFileExcel } from 'react-icons/ai';
import { FaCaretRight, FaCaretLeft } from 'react-icons/fa6';

interface Winner {
  winnerName: string;
  prize: string | null;
  address: string | null;
  phone: string | null;
  ranking: number;
}

interface PrizeInfoPopUpProps {
  roomId: number | null;
  closePopup: () => void;
}

export default function PrizeInfoPopUp({
  roomId,
  closePopup,
}: Readonly<PrizeInfoPopUpProps>) {
  const itemsPerPage = 5;
  const [winnerInfo, setWinnerInfo] = useState<Winner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(winnerInfo.length / itemsPerPage);

  useEffect(() => {
    const fetchWinnerInfo = async () => {
      if (roomId !== null) {
        setLoading(true);
        try {
          // const data = await getWinnerInfo(roomId);
          const data = eventWinner.response;
          // console.log(data);
          // setWinnerInfo(data.winners || []);
          setWinnerInfo(data.winners);
          setError(null);
        } catch (err) {
          setError('당첨자 정보를 가져오는 중 오류가 발생했습니다.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchWinnerInfo();
  }, [roomId]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const currentItems = winnerInfo.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const headers = [
    { label: '등수', key: 'ranking' },
    { label: '상품', key: 'product' },
    { label: '이름', key: 'winnerName' },
    { label: '전화번호', key: 'phone' },
    { label: '배송지', key: 'address' },
  ];

  const csvData = winnerInfo.map((winner) => ({
    ranking: winner.ranking,
    product: winner.prize ?? '정보가 입력되지 않았습니다.',
    winnerName: winner.winnerName,
    phone: winner.phone ?? '정보가 입력되지 않았습니다.',
    address: winner.address ?? '정보가 입력되지 않았습니다.',
  }));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="relative bg-white p-6 rounded-lg w-full max-w-2xl md:max-w-3xl lg:max-w-4xl">
        <p className="text-2xl font-bold mb-8 text-center">당첨자 정보</p>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && winnerInfo.length === 0 ? (
          <p className="text-center text-gray-500 mb-10">배송 요청 정보 없음</p>
        ) : (
          <>
            <div>
              <CSVLink
                headers={headers}
                data={csvData}
                filename="winner_info.csv"
                className="flex items-center mt-4 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
              >
                <AiOutlineFileExcel className="mr-2" />
                엑셀로 다운로드
              </CSVLink>
            </div>
            <table className="w-full mb-6 text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 text-center">
                <tr>
                  <th scope="col" className="px-4 py-2">
                    등수
                  </th>
                  <th scope="col" className="px-4 py-2">
                    상품
                  </th>
                  <th scope="col" className="px-4 py-2">
                    이름
                  </th>
                  <th scope="col" className="px-4 py-2">
                    전화번호
                  </th>
                  <th scope="col" className="px-4 py-2">
                    배송지
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((winner) => (
                  <tr key={winner.ranking} className="border-b text-center">
                    <td className="px-4 py-2">{winner.ranking}</td>
                    <td className="px-4 py-2">{winner.prize ?? '미입력'}</td>
                    <td className="px-4 py-2">{winner.winnerName}</td>
                    <td className="px-4 py-2">{winner.phone ?? '미입력'}</td>
                    <td className="px-4 py-2">{winner.address ?? '미입력'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center items-center my-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`p-2 ${
                  currentPage === 1
                    ? 'text-gray-400'
                    : 'text-gray-700 hover:bg-gray-100 transition'
                }`}
              >
                <FaCaretLeft />
              </button>
              <p className="text-center text-sm">
                {currentPage} / {totalPages}
              </p>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`p-2 ${
                  currentPage === totalPages
                    ? 'text-gray-400'
                    : 'text-gray-700 hover:bg-gray-100 transition'
                }`}
              >
                <FaCaretRight />
              </button>
            </div>
          </>
        )}
        <div className="flex justify-center">
          <button
            onClick={closePopup}
            className="mt-2 px-4 py-2 bg-mainColor1 text-white rounded-lg min-w-40"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
