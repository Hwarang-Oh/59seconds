import axios, { isAxiosError } from 'axios';

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

/**
 * IMP : AccessToken 재발급을 위한 API
 */
const REFRESH_URL = '/api/v1/auth/reissue';
export const reissueToken = async (): Promise<string> => {
  try {
    const response = await axios.get(
      `${REFRESH_URL}?providerId=${encodeURIComponent('providerId')}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'refresh-token': 'refreshToken',
        },
      }
    );
    let accessToken = response.data.data.accessToken;
    // let accessTokenTime = getTokenExpiration(response.data.data.accessToken);
    // setCookie('AccessToken', accessToken, {
    //   maxAge: accessTokenTime,
    //   secure: true,
    // });
    return accessToken;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) throw new Error('Not Found');
      else {
        // removeCookie('AccessToken');
        // removeCookie('RefreshToken');
        // removeCookie('ProviderId');
        throw new Error('refreshToken is expired, redirecting to login.');
      }
    } else throw error;
  }
};
 
api.interceptors.request.use(async (config) => {
  return config;
});

export default api;
