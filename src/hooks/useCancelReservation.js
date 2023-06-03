import { useState } from 'react';

export const useCancelReservation = initialData => {
  const [updatedItem, setUpdatedItem] = useState(initialData);
  const [selectedId, setSelectedId] = useState('');
  const [showReservaionModal, setShowReservationModal] = useState(false);

  const cancelCancellationHandler = () => {
    setShowReservationModal(false);
  };
  const cancelConfirmHandler = id => {
    setShowReservationModal(true);
    setSelectedId(id);
  };

  const cancelReservationHandler = () => {
    setShowReservationModal(false);
    setUpdatedItem(
      updatedItem.map(item =>
        item.id === selectedId ? { ...item, status: '취소' } : item,
      ),
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
