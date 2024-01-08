import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import axios from 'axios';
import { authAction } from '../store/auth';

export const useAuth = () => {
  const url = process.env.REACT_APP_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const memberId = useSelector(state => state.auth.memberId);
  const token = useSelector(state => state.auth.token);

  // 로그인 처리 함수
  const handleLogin = useCallback((accessToken, refresh, memberId) => {
    localStorage.setItem(
      'userData',
      JSON.stringify({
        memberId,
        accessToken,
        refresh,
      }),
    );
    dispatch(authAction.LOGIN({ token: accessToken, memberId }));
  }, []);

  // 로그아웃 처리 함수
  const handleLogout = useCallback(isRefresh => {
    const userToken = localStorage.getItem('userData');

    if (!userToken) {
      navigate('/login');
      return;
    }

    const { accessToken, refresh } = JSON.parse(userToken);

    axios
      .delete(`${url}/auth/logout`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        localStorage.removeItem('userData');
        dispatch(authAction.LOGOUT());
        if (isRefresh) {
          navigate('/login');
        } else {
          navigate('/');
        }
      })
      .catch(err => {
        if (
          err.response.status === 401 &&
          err.response.data.code !== 'INVALID_EMAIL_PASSWORD'
        ) {
          logoutRefresh(refresh);
        }
      });
  }, []);

  const logoutRefresh = refresh => {
    axios
      .post(
        `${url}/auth/reIssue/token`,
        { refreshToken: refresh },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => {
        const { memberId, accessToken, newRefreshToken } = response.data;
        handleLogin(accessToken, newRefreshToken, memberId);
        handleLogout(false);
      })
      .catch(err => {
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('userData');
          dispatch(authAction.LOGOUT());
          navigate('/login');
        }
      });
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.accessToken) {
      handleLogin(
        storedData.accessToken,
        storedData.refresh,
        storedData.memberId,
      );
    }
  }, [handleLogin]);

  return {
    isLoggedIn,
    token,
    memberId: Number(memberId),
    login: handleLogin,
    logout: handleLogout,
  };
};
