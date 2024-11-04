export default function Footer() {
  return (
    <footer className='bg-white text-gray-700 py-8 border-t'>
      {/* 상단 링크 */}
      <div className='flex justify-center space-x-8 text-sm mb-4'>
        <a href='#company' className='hover:underline'>
          회사소개
        </a>
        <a href='#events' className='hover:underline'>
          선착순 이벤트 안내
        </a>
        <a href='#privacy' className='hover:underline'>
          개인정보처리방침
        </a>
      </div>

      {/* 중간 정보 */}
      <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm px-4'>
        {/* 회사 정보 */}
        <div>
          <h3 className='font-semibold mb-2'>주식회사 59초 (1S Before)</h3>
          <p>서울특별시 강남구 테헤란로 212</p>
          <p>사업자등록번호: 123-45-67890</p>
          <p>통신판매업신고: 2024-서울서초-1234</p>
          <p>호스팅제공자: 주식회사 59초 | 대표이사 오화랑</p>
        </div>

        {/* 고객센터 정보 */}
        <div>
          <h3 className='font-semibold mb-2'>고객센터</h3>
          <p>이벤트 주최 문의: 010-7253-8878</p>
          <p>이벤트 참여 문의: 010-1234-5678</p>
          <p>팩스: 02-1544-9001 | 이메일: 404DreamSolutions@gmail.com</p>
        </div>

        {/* 담당자 정보 */}
        <div>
          <h3 className='font-semibold mb-2'>이벤트 공정성 분쟁처리 담당</h3>
          <p>이벤트 공정성 연락: 010-7253-8878</p>
          <p>이메일: 404DreamSolutions@gmail.com</p>
          <p>개인정보보호책임자: 404DreamSolutions@gmail.com</p>
        </div>
      </div>

      {/* 하단 정보 */}
      <div className='max-w-6xl mx-auto text-xs text-left text-gray-500 mt-8 px-4'>
        <p className='mb-2'>
          주식회사 59초는 이용자가 제공한 개인정보를 소중히 취급하며, 관련 법령을 준수하여 안전하게
          관리하고 있습니다.
        </p>
        <p className='mb-2'>
          주식회사 59초는 인플루언서가 제공하는 개별 이벤트 상품에 대하여 통신판매중개자의 지위를
          가지며, 해당 상품의 정보와 거래에 관한 책임은 각 판매자에게 있습니다.
        </p>
        <p>Copyright ⓒ 59 Seconds Corp. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
