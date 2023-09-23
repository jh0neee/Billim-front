import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { pageAction } from '../store/currentPage';

export default function BackLocation() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!pathname.includes('/chat')) {
      dispatch(pageAction.setCurrentPage(pathname));
    }
  }, [pathname, dispatch]);

  return null;
}
