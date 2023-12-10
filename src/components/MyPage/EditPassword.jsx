import React from 'react';
import styled from 'styled-components';

import axios from 'axios';
import Input from '../UI/Input';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import ErrorModal from '../../util/ErrorModal';
import { useForm } from '../../hooks/useForm';
import { useToastAlert } from '../../hooks/useToastAlert';
import { useLoadingError } from '../../hooks/useLoadingError';
import { useTokenRefresher } from '../../hooks/useTokenRefresher';
import {
  VALIDATOR_MATCH_PASSWORD,
  VALIDATOR_PASSWORD,
} from '../../util/validators';

export const PasswordBox = styled.div`
  display: grid;
  grid-template-columns: 0.45fr 0.8fr;
  align-items: center;
  margin: 0;

  > div {
    margin-top: ${props => (props.subPw ? '0.5rem' : '0')};

    > p:last-child {
      margin-left: 0.5rem;
      font-size: 0.7rem;
    }
  }

  > * {
    &:first-child {
      margin-left: 0.5rem;
      margin-bottom: ${props => (props.mainPw ? '1.2rem' : '0')};
      font-weight: 600;
    }
  }
`;

const ModalLayout = styled(Modal)`
  > form {
    > div {
      padding: 1rem 0.5rem 1.6rem;
    }
  }
`;

const EditPassword = ({
  url,
  auth,
  showModal,
  closeModal,
  setPasswordChanged,
}) => {
  const { showToast } = useToastAlert();
  const { error, clearError, errorHandler } = useLoadingError();
  const { tokenErrorHandler } = useTokenRefresher(auth);
  const [formState, inputHandler] = useForm({}, false);
  const closeEditPasswordModal = () => {
    if (!formState.isValid) {
      showToast(
        '영문, 숫자, 특수문자를 조합하여 8~16자로 입력해야 합니다.',
        'error',
      );
      return;
    }

    axios
      .put(
        `${url}/member/info/password`,
        {
          newPassword: formState.inputs.newPassword.value,
          password: formState.inputs.password.value,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`,
          },
        },
      )
      .then(() => {
        closeModal();
        setPasswordChanged(true);
      })
      .catch(err => {
        closeModal();
        if (
          err.response.status === 401 &&
          err.response.data.code !== 'INVALID_EMAIL_PASSWORD'
        ) {
          tokenErrorHandler(err);
        } else {
          errorHandler(err);
        }
      });
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <ModalLayout
        show={showModal}
        header="비밀번호 변경"
        onCancel={closeModal}
        className="modalContent"
        footer={
          <>
            <Button small width="60px" onClick={closeEditPasswordModal}>
              확인
            </Button>
            <Button small sub width="60px" onClick={closeModal}>
              취소
            </Button>
          </>
        }
      >
        <PasswordBox>
          <p>기존비밀번호</p>
          <div>
            <Input
              element="input"
              type="password"
              id="password"
              height="30px"
              width="12rem"
              validators={[VALIDATOR_PASSWORD()]}
              errorText={null}
              onInput={inputHandler}
            />
          </div>
        </PasswordBox>
        <PasswordBox mainPw>
          <p>신규비밀번호</p>
          <div>
            <Input
              element="input"
              type="password"
              id="newPassword"
              height="30px"
              width="12rem"
              validators={[VALIDATOR_PASSWORD()]}
              errorText={null}
              onInput={inputHandler}
            />
            <p>※영문 숫자 특수문자 조합, 8~16자리</p>
          </div>
        </PasswordBox>
        <PasswordBox subPw>
          <p>비밀번호확인</p>
          <Input
            element="input"
            type="password"
            id="confirmPassword"
            height="30px"
            width="12rem"
            validators={[
              VALIDATOR_MATCH_PASSWORD(formState.inputs.newPassword),
            ]}
            errorText="비밀번호가 일치하지 않습니다"
            onInput={inputHandler}
          />
        </PasswordBox>
      </ModalLayout>
    </>
  );
};

export default EditPassword;
