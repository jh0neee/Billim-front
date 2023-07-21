import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const TokenRefresher = () => {
  const url = process.env.REACT_APP_URL;
  const auth = useAuth();
  const navigate = useNavigate();
  const [isRefreshingToken, setRefreshingToken] = useState(false);
  const [requestQueue, setRequestQueue] = useState([]);

  const refreshAccessToken = async () => {
    try {
      const refreshTokenData = localStorage.getItem('userData');
      if (refreshTokenData) {
        const { refresh } = JSON.parse(refreshTokenData);
        setRefreshingToken(true);

        const response = await axios.post(
          `${url}/auth/reIssue/token`,
          { refreshToken: refresh },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        const { memberId, accessToken, newRefreshToken } = response.data;
        auth.login(accessToken, newRefreshToken, memberId);
        setRefreshingToken(false);

        for (const requestConfig of requestQueue) {
          await axios(requestConfig);
        }

        setRequestQueue([]);
      }
    } catch (error) {
      auth.logout();
      alert('자동 로그아웃 되었습니다. 다시 로그인 해주세요.');
      return navigate('/login');
    }
  };

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      response => response,
      async error => {
        if (isRefreshingToken) {
          const originalConfig = error.config;
          setRequestQueue(prevQueue => [...prevQueue, originalConfig]);
          return Promise.resolve(error);
        }

        const errType = error.response.data.error;

        if (error.response.status === 401) {
          if (errType === 'EXPIRED_TOKEN') {
            await refreshAccessToken();
          } else {
            auth.logout();
            alert('자동 로그아웃 되었습니다. 다시 로그인 해주세요.');
            return navigate('/login');
          }

          return Promise.reject(error);
        }
      },
    );
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  return <></>;
};
