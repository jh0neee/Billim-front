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
      <p>
        {props.error}: <br />
        잠시 후 다시 시도해주세요.
      </p>
    </Modal>
  );
};

export default ErrorModal;
