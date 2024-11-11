import axios, { isAxiosError } from 'axios';

/**
 * IMP : 기본 API 구조
 */
let memberId = '0';
if (typeof window !== 'undefined') {
  memberId = sessionStorage.getItem('memberId') ?? '0';
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    memberId: Number(memberId),
  },
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
