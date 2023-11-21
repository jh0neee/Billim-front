import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import axios from 'axios';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { useAuth } from '../../hooks/useAuth';
import { useLoadingError } from '../../hooks/useLoadingError';

const KakaoRedirect = () => {
  const url = process.env.REACT_APP_URL;
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const { isLoading, onLoading } = useLoadingError();

  const code = searchParams.get('code');
  const state = searchParams.get('state');

  useEffect(() => {
    onLoading(true);
    axios
      .get(`${url}/oauth/kakao?code=${code}&state=${state}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      .then(response => {
        const { accessToken, refreshToken, memberId } = response.data;
        auth.login(accessToken, refreshToken, memberId);
        navigate('/');
        onLoading(false);
      })
      .catch(() => {
        onLoading(false);
      });
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }
};

export default KakaoRedirect;
