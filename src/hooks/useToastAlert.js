import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useToastAlert = () => {
  const showToast = (message, type = 'default') => {
    let toastMessage;

    if (type === 'success') {
      toastMessage = toast.success(message);
    } else if (type === 'info') {
      toastMessage = toast.info(message);
    } else if (type === 'warning') {
      toastMessage = toast.warning(message);
    } else if (type === 'error') {
      toastMessage = toast.error(message);
    }

    return toastMessage;
  };

  const ToastWrapper = position => {
    return (
      <ToastContainer
        position={position}
        limit={1}
        autoClose={1500}
        hideProgressBar={true}
        pauseOnHover={false}
        closeOnClick
      />
    );
  };

  return { showToast, ToastWrapper };
};
