import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터에서 동적으로 `memberId` 추가
api.interceptors.request.use((config) => {
  // 클라이언트 환경에서만 `sessionStorage`에서 `memberId` 가져오기
  if (typeof window !== 'undefined') {
    const storedMember = sessionStorage.getItem('member-storage'); // member 정보 가져오기
    if (storedMember) {
      const memberId = JSON.parse(storedMember).state.member.memberId; // JSON에서 memberId 추출
      if (memberId) {
        config.headers['memberId'] = memberId;
      }
    }
  }
  return config;
});

export default api;
