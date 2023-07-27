import { useEffect, useState } from 'react';

export const useContentResize = (width, contentRef) => {
  const [contentResize, setResize] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (!contentRef.current) {
        return;
      }
      const contentBoxWidth = contentRef.current.clientWidth;
      console.log(contentBoxWidth, width);
      setResize(contentBoxWidth < width);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { contentResize };
};
