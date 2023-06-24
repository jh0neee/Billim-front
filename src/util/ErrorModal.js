import React from 'react';

import Modal from '../components/UI/Modal';
import Button from '../components/UI/Button';

const ErrorModal = props => {
  return (
    <Modal
      onCancel={props.onClear}
      header="Error"
      show={!!props.error}
      footer={
        <Button small width="60px" onClick={props.onClear}>
          확인
        </Button>
      }
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
