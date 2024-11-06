export default function Footer() {
  return (
    <div className='flex flex-col gap-7 mb-7'>
      <div className='flex h-[50px] justify-center items-center border border-gray-300'>
        <ul className='flex'>
          <li className="relative after:content-['|'] after:ml-4">
            <a
              href='https://truthful-care-94f.notion.site/404-Dream-Solutions-121a9e7f15bf809cad4adaa6dd61e4b2?pvs=4'
              className='hover:underline'>
              회사소개
            </a>
          </li>
          <li className="relative after:content-['|'] after:ml-4 ml-4">
            <a href='https://lab.ssafy.com/s11-final/S11P31A404' className='hover:underline'>
              선착순 이벤트 안내
            </a>
          </li>
          <li className="relative after:content-['|'] ml-4 last:after:content-['']">
            <a href='/' className='hover:underline font-bold'>
              개인정보 처리 방침
            </a>
          </li>
        </ul>
      </div>

      <div className='max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-[12px] text-gray-600'>
        <div>
          <p className='text-black text-sm font-bold'>주식회사 59초 ( 1S Before )</p>
          <p>서울특별시 강남구 테헤란로 212</p>
          <div className='flex gap-1'>
            <p>사업자등록번호 123-45-67890</p>
            <a href='https://moneypin.biz/bizno/' className='text-blue-500 hover:underline'>
              사업자정보확인
            </a>
          </div>
          <p>통신판매업신고 2024-서울서초-1234</p>
          <p>호스팅서비스제공자 주식회사 59초 | 대표이사 오화랑</p>
        </div>

        <div>
          <p className='text-black text-sm font-bold'>고객센터</p>
          <p>이벤트 주최 문의 010-7253-8878</p>
          <p>이벤트 참여 문의 010-1234-5678</p>
          <p>팩스 02-1544-9001 | 이메일 404DreamSolutions@gmail.com</p>
        </div>

        <div>
          <p className='text-black text-sm font-bold'>이벤트 공정성 분쟁처리 담당</p>
          <p>이벤트 공정성 문의 010-7253-8878</p>
          <p>이메일 404DreamSolutions@gmail.com</p>
          <p>개인정보보호책임자 cmbear314@dongguk.edu</p>
        </div>
      </div>

      <div className='max-w-screen-xl mx-auto text-xs text-gray-500' style={{ color: '#1C1C1E' }}>
        <p>
          주식회사 59초는 이용자가 제공한 개인정보를 소중히 취급하며, 관련 법령을 준수하여 안전하게
          관리하고 있습니다.
        </p>
        <p>
          주식회사 59초는 인플루언서가 제공하는 개별 이벤트 상품에 대하여 통신판매중개자의 지위를
          가지며, 해당 상품의 정보와 거래에 관한 책임은 각 판매자에게 있습니다.
        </p>
        <p>Copyright ⓒ 59 Seconds Corp. All Rights Reserved.</p>
      </div>
    </div>
  );
}
