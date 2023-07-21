import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from '../store/auth';

export const useAuth = () => {
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
  const handleLogout = useCallback(() => {
    localStorage.removeItem('userData');
    dispatch(authAction.LOGOUT());
  }, []);

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
    memberId,
    login: handleLogin,
    logout: handleLogout,
  };
};
