import axios from 'axios';
import { debounce } from 'lodash';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const refreshAPI = axios.create({
  baseURL: process.env.REACT_APP_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const useTokenRefresher = auth => {
  const url = process.env.REACT_APP_URL;
  const navigate = useNavigate();
  const [isRefresh, setIsRefresh] = useState(false);

  const refreshTokenHandler = debounce(() => {
    const refreshTokenData = localStorage.getItem('userData');

    if (refreshTokenData) {
      const { refresh } = JSON.parse(refreshTokenData);

      if (isRefresh) {
        return;
      }

      setIsRefresh(true);
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
          auth.login(accessToken, newRefreshToken, memberId);
          setIsRefresh(false);
          return response;
        })
        .catch(err => {
          if (
            err.response.data.code === 'MISMATCH_REFRESH_TOKEN' ||
            err.response.data.code === 'EXPIRED_REFRESH_TOKEN' ||
            err.response.data.code === 'INVALID_REFRESH_TOKEN'
          ) {
            auth.logout();
            navigate('/login');
          }
          setIsRefresh(false);
        });
    }
  }, 500);

  const tokenErrorHandler = err => {
    if (err.response.data.error === 'EXPIRED_TOKEN') {
      refreshTokenHandler();
    } else {
      auth.logout();
      navigate('/login');
    }
  };

  // axios 요청 인터셉터 설정
  refreshAPI.interceptors.request.use(
    config => tokenErrorHandler(config),
    error => Promise.reject(error),
  );

  // axios 응답 인터셉터 설정
  refreshAPI.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        return tokenErrorHandler(error);
      } else {
        return Promise.reject(error);
      }
    },
  );

  return { tokenErrorHandler };
};
