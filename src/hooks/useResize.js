import { useCallback, useEffect, useState } from 'react';

export const useResize = (width, operator, maxWidth = null) => {
  const [resize, setResize] = useState(false);

  const handleResize = useCallback(() => {
    const windowWidth = window.innerWidth;
    let result;

    if (maxWidth === null) {
      if (operator === '<') {
        result = windowWidth < width;
        console.log('1번');
      } else if (operator === '>') {
        result = windowWidth > width;
        console.log('2번');
      }
    } else {
      if (operator === '<=') {
        result = width < windowWidth && windowWidth <= maxWidth;
      } else if (operator === '>') {
        result = windowWidth > width;
      } else if (operator === '<') {
        result = windowWidth <= width;
      }
    }
    setResize(result);
  }, []);

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return resize;
};
