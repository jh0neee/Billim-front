import { useState, useEffect } from 'react';

const useTimer = initialTime => {
  const [timer, setTimer] = useState(initialTime);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setIsExpired(true);
    }
  }, [timer]);

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${
      seconds < 10 ? '0' : ''
    }${seconds}`;
  };

  const resetTimer = () => {
    setTimer(initialTime);
    setIsExpired(false);
  };

  return { timer: formatTime(timer), isExpired, resetTimer };
};

export default useTimer;
