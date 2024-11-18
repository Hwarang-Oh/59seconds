import { CSVLink } from 'react-csv';
import { useEffect, useState } from 'react';
import { getWinnerInfo } from '@/apis/eventAPI';
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

export default function PrizeInfoPopUp({ roomId, closePopup }: Readonly<PrizeInfoPopUpProps>) {
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
          const data = await getWinnerInfo(roomId);
          setWinnerInfo(data.winners || []);
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
    product: winner.prize ?? '미입력',
    winnerName: winner.winnerName,
    phone: winner.phone ?? '미입력',
    address: winner.address ?? '미입력',
  }));

  return (
    <div className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50'>
      <div className='relative bg-white p-6 rounded-lg w-full max-w-2xl md:max-w-3xl lg:max-w-4xl h-[55vh] flex flex-col'>
        <p className='text-2xl font-bold my-4 text-center'>당첨자 정보</p>
        {loading && (
          <p className='text-center text-gray-500 mb-10 flex-grow flex items-center justify-center'>
            로딩 중...
          </p>
        )}

        {!loading && winnerInfo.length === 0 && error ? (
          <p className='text-center text-gray-500 mb-10 flex-grow flex items-center justify-center'>
            배송 요청 정보 없음
          </p>
        ) : (
          <>
            <div className='flex items-center justify-end mb-4'>
              <CSVLink
                headers={headers}
                data={csvData}
                filename={`${roomId}_당첨자정보.csv`}
                className='flex items-center justify-center px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition'>
                <AiOutlineFileExcel className='mr-2 text-xs' />
                엑셀로 받기
              </CSVLink>
            </div>
            <div className='flex-grow overflow-y-auto'>
              <table className='w-full text-sm text-left text-gray-500'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-100 text-center'>
                  <tr>
                    <th scope='col' className='px-4 py-2'>
                      등수
                    </th>
                    <th scope='col' className='px-4 py-2'>
                      상품
                    </th>
                    <th scope='col' className='px-4 py-2'>
                      이름
                    </th>
                    <th scope='col' className='px-4 py-2'>
                      전화번호
                    </th>
                    <th scope='col' className='px-4 py-2'>
                      배송지
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((winner) => (
                    <tr key={winner.ranking} className='border-b text-center'>
                      <td className='px-4 py-2'>{winner.ranking}</td>
                      <td className='px-4 py-2'>{winner.prize ?? '미입력'}</td>
                      <td className='px-4 py-2'>{winner.winnerName}</td>
                      <td className='px-4 py-2'>{winner.phone ?? '미입력'}</td>
                      <td className='px-4 py-2'>{winner.address ?? '미입력'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='flex justify-center items-center mb-4'>
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`p-2 ${
                  currentPage === 1 ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-100 transition'
                }`}>
                <FaCaretLeft />
              </button>
              <p className='text-center text-sm'>
                {currentPage} / {totalPages}
              </p>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`p-2 ${
                  currentPage === totalPages
                    ? 'text-gray-400'
                    : 'text-gray-700 hover:bg-gray-100 transition'
                }`}>
                <FaCaretRight />
              </button>
            </div>
          </>
        )}
        <div className='flex justify-center mt-4'>
          <button
            onClick={closePopup}
            className='px-4 py-2 bg-mainColor1 text-white rounded-lg min-w-40'>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
