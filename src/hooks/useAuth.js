import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from '../store/auth';
import axios from 'axios';

export const useAuth = () => {
  const url = process.env.REACT_APP_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const memberId = useSelector(state => state.auth.memberId);
  const token = useSelector(state => state.auth.token);

  // 로그인 처리 함수
  const handleLogin = useCallback((accessToken, refreshToken, memberId) => {
    localStorage.setItem(
      'userData',
      JSON.stringify({
        memberId,
        accessToken,
        refreshToken,
      }),
    );
    dispatch(authAction.LOGIN({ token: accessToken, memberId }));
  }, []);

  // 로그아웃 처리 함수
  const handleLogout = useCallback(() => {
    localStorage.removeItem('userData');
    dispatch(authAction.LOGOUT());
  }, []);

  // 엑세스 토큰 갱신 함수
  const refreshAccessToken = () => {
    const refreshTokenData = localStorage.getItem('userData');
    if (refreshTokenData) {
      const { refreshToken } = JSON.parse(refreshTokenData);
      axios
        .post(
          `${url}/auth/reIssue/token`,
          { refreshToken },
          { headers: { 'Content-Type': 'application/json' } },
        )
        .then(response => {
          const { newAccessToken, refreshToken, memberId } = response.data;
          handleLogin(newAccessToken, refreshToken, memberId);
        })
        .catch(err => {
          console.error('error', err);
          handleLogout();
          navigate('/login');
        });
    } else {
      handleLogout();
      navigate('/login');
    }
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.accessToken) {
      handleLogin(
        storedData.accessToken,
        storedData.refreshToken,
        storedData.memberId,
      );
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
    memberId,
    login: handleLogin,
    logout: handleLogout,
  };
};
