import axios, { isAxiosError } from 'axios';

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

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  // let accessToken = getCookie('AccessToken');
  // const refreshToken = getCookie('RefreshToken');

  // IMP : 비로그인 상태의 요청 Intercept
  // if (!accessToken && !refreshToken) {
  //   console.warn('비로그인 상태 => 비로그인 사용자로 처리합니다.');
  //   return config;
  // }

  // IMP : 로그인 상태, AccessToken이 만료된 상태의 요청 Intercept
  // IMP : AccessToken reissue 가능 => AccessToken 재발급 후 요청
  // IMP : AccessToken reissue 불가능 => 비로그인 사용자로 처리함.
  // if (!accessToken && refreshToken) {
  //   try {
  //     accessToken = await reissueToken();
  //   } catch (error: unknown) {
  //     console.warn('AccessToken 재발급 실패 => 비로그인 사용자로 처리합니다.');
  //     return config;
  //   }
  // }

  // IMP : 로그인 상태, AccessToken이 유효한 상태의 요청 Intercept
  // IMP : AccessToken이 유효하면, 요청에 AccessToken을 추가함.
  // if (accessTokenTime && accessTokenTime > Date.now()) {}
  // if (accessToken) config.headers.Authorization = accessToken;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (responseError) => {
    const originalRequest = responseError.config;
    if (
      responseError.response &&
      responseError.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const accessToken = await reissueToken();
        originalRequest.headers.Authorization = accessToken;
        return api(originalRequest);
      } catch (RefreshError) {
        return Promise.reject(RefreshError);
      }
    }
    return Promise.reject(responseError);
  }
);

export default api;
