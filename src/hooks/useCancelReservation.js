import axios from 'axios';
import { useState } from 'react';
import { useAuth } from './useAuth';

export const useCancelReservation = (
  purchaseProduct,
  tokenErrorHandler,
  onLoading,
  errorHandler,
) => {
  const url = process.env.REACT_APP_URL;
  const auth = useAuth();
  const [selectedId, setSelectedId] = useState('');
  const [showReservaionModal, setShowReservationModal] = useState(false);

  const cancelCancellationHandler = () => {
    setShowReservationModal(false);
  };
  const cancelConfirmHandler = id => {
    setShowReservationModal(true);
    setSelectedId(id);
  };

  const cancelReservationHandler = getPurchase => {
    setShowReservationModal(false);

    const orderItem = purchaseProduct.find(item => item.orderId === selectedId);
    const orderId = orderItem.orderId;

    onLoading(true);
    axios
      .delete(`${url}/order/${orderId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then(() => {
        getPurchase();
        onLoading(false);
      })
      .catch(err => {
        if (
          err.response.status === 401 &&
          err.response.data.code !== 'INVALID_EMAIL_PASSWORD'
        ) {
          tokenErrorHandler(err);
          onLoading(false);
        } else {
          errorHandler(err);
        }
      });
  };

  return {
    showReservaionModal,
    cancelCancellationHandler,
    cancelConfirmHandler,
    cancelReservationHandler,
  };
};
