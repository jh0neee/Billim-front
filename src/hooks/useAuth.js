import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from '../store/auth';
import axios from 'axios';

export const useAuth = () => {
  const url = process.env.REACT_APP_URL;
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const token = useSelector(state => state.auth.token);

  // 로그인 처리 함수
  const handleLogin = (accessToken, refreshToken) => {
    localStorage.setItem(
      'userData',
      JSON.stringify({
        accessToken,
        refreshToken,
      }),
    );
    dispatch(authAction.LOGIN(accessToken));
  };

  // 로그아웃 처리 함수
  const handleLogout = () => {
    localStorage.removeItem('userData');
    dispatch(authAction.LOGOUT());
  };

  // 엑세스 토큰 갱신 함수
  const refreshAccessToken = () => {
    const refreshTokenData = localStorage.getItem('userData');
    console.log(refreshTokenData);
    if (refreshTokenData) {
      const { refreshToken } = JSON.parse(refreshTokenData);
      axios
        .post(
          `${url}/auth/reIssue/token`,
          { refreshToken },
          { headers: { 'Content-Type': 'application/json' } },
        )
        .then(response => {
          const { newAccessToken, refreshToken } = response.data;
          handleLogin(newAccessToken, refreshToken);
        })
        .catch(err => {
          console.error('error', err);
          handleLogout();
        });
    } else {
      handleLogout();
    }
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    console.log(storedData);
    if (storedData && storedData.accessToken) {
      handleLogin(storedData.accessToken, storedData.refreshToken);
    }
  }, [handleLogin]);

  // API 요청 시 에러 처리
  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        refreshAccessToken();
      }
      return Promise.reject(error);
    },
  );

  return {
    isLoggedIn,
    token,
    login: handleLogin,
    logout: handleLogout,
  };
};
