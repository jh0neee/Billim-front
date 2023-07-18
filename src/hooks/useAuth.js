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
      const { accessToken, refreshToken } = JSON.parse(refreshTokenData);

      console.log('accessToken', accessToken, 'refreshToken', refreshToken);
      axios
        .post(
          `${url}/auth/reIssue/token`,
          { accessToken, refreshToken },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        .then(response => {
          console.log('재발급 성공', response.data.accessToken);
          const { accessToken, refreshToken } = response.data;
          handleLogin(accessToken, refreshToken, 7);
        })
        .catch(() => {
          console.log('재발급 실패');
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
      if (error.response.data.error === 'EXPIRED_TOKEN') {
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
