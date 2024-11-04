'use client';
import styled from '@emotion/styled';
import HeaderToggle from '@/components/common/HeaderToggle';

export default function HeaderInfo() {
  return (
    <HeaderInfoContainer>
      <HeaderInfoItem>로그인</HeaderInfoItem>
      <HeaderInfoItem>마이페이지</HeaderInfoItem>
      <HeaderToggle />
    </HeaderInfoContainer>
  );
}

const HeaderInfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 26px;
`;

const HeaderInfoItem = styled.div`
  color: #474972;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 120% */
`;
