import { useState } from 'react';

export const useLoadingError = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const onLoading = loadingState => {
    setIsLoading(loadingState);
  };

  const clearError = () => {
    setError(null);
  };

  const errorHandler = err => {
    let errorMessage;

    if (err.data) {
      errorMessage = err.data.message || '잠시 후 다시 시도해주세요';
    } else {
      if (err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
      } else {
        errorMessage = err.message;
      }

      setError(errorMessage);
      setIsLoading(false);
      throw err;
    }
  };

  return { isLoading, error, onLoading, clearError, errorHandler };
};
