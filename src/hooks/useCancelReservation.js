import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';

export const useCancelReservation = initialData => {
  const url = process.env.REACT_APP_URL;
  const auth = useAuth();
  const [updatedItem, setUpdatedItem] = useState(initialData);
  const [selectedId, setSelectedId] = useState('');
  const [showReservaionModal, setShowReservationModal] = useState(false);

  useEffect(() => {
    setUpdatedItem(initialData);
  }, [initialData]);

  const cancelCancellationHandler = () => {
    setShowReservationModal(false);
  };
  const cancelConfirmHandler = id => {
    setShowReservationModal(true);
    setSelectedId(id);
  };

  const cancelReservationHandler = () => {
    setShowReservationModal(false);

    const orderItem = updatedItem.find(item => item.orderId === selectedId);
    const orderId = orderItem.orderId;
    axios
      .delete(`${url}/order/${orderId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });

    setUpdatedItem(
      updatedItem.map(item => (item.orderId === selectedId ? item : item)),
    );
  };

  return {
    updatedItem,
    showReservaionModal,
    cancelCancellationHandler,
    cancelConfirmHandler,
    cancelReservationHandler,
  };
};
