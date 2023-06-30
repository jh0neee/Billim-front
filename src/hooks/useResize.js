import { useCallback, useEffect, useState } from 'react';

export const useResize = (width, operator) => {
  const [resize, setResize] = useState(false);

  const handleResize = useCallback(() => {
    const windowWidth = window.innerWidth;
    const result = operator === '<' ? windowWidth < width : windowWidth > width;
    setResize(result);
  }, []);

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return { resize };
};
