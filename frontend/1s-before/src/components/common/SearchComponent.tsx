'use client';
import styled from '@emotion/styled';
import SearchIcon from '@/components/common/SearchIcon';

export default function SearchComponent() {
  return (
    <SearchBar>
      <SearchInput placeholder='관심있는 이벤트를 검색해보세요.' />
      <SearchIcon />
    </SearchBar>
  );
}

const SearchBar = styled.div`
  display: flex;
  width: 450px;
  height: 50px;
  padding: 15px 17px 15px 21px;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 175px;
  border-radius: 25px;
  border: 3px solid rgba(71, 73, 114, 0.6);
`;

const SearchInput = styled.input`
  color: rgba(71, 73, 114, 0.32);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 112.5% */
`;
