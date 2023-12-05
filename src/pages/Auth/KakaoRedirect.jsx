import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { useAuth } from '../../hooks/useAuth';
import { useLoadingError } from '../../hooks/useLoadingError';

const KakaoRedirect = () => {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const { isLoading, onLoading } = useLoadingError();

  const handleRedirect = async () => {
    onLoading(true);

    const access = searchParams.get('accessToken');
    const refresh = searchParams.get('refreshToken');
    const memberId = searchParams.get('memberId');

    auth.login(access, refresh, memberId);
    navigate('/');

    onLoading(false);
  };

  useEffect(() => {
    handleRedirect();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }
};

export default KakaoRedirect;
