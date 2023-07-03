import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import axios from 'axios';
import theme from '../../styles/theme';
import Input from '../UI/Input';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import ErrorModal from '../../util/ErrorModal';
import LoadingSpinner from '../UI/LoadingSpinner';
import { useForm } from '../../hooks/useForm';
import { useLoadingError } from '../../hooks/useLoadingError';
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from '../../util/validators';

const FindUserBox = styled.form`
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;

  > * {
    &:nth-child(2) {
      margin: 1.2rem auto 0;
    }
  }

  > button {
    margin: 1.6rem 0 0;
  }

  @media ${theme.mobile} {
    width: 250px;
  }
`;

const FindUserInput = styled(Input)`
  > input {
    width: 300px;

    @media ${theme.mobile} {
      width: 250px;
    }
  }
`;

const FindPwTab = () => {
  const url = process.env.REACT_APP_URL;
  const navigate = useNavigate();
  const { isLoading, error, onLoading, clearError, errorHandler } =
    useLoadingError();
  const [formState, inputHandler] = useForm({}, false);

  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
    navigate('/login');
  };

  const sendPasswordHandler = e => {
    e.preventDefault();

    if (!formState.isValid) {
      alert('빈칸 없이 작성해주세요.');
      return;
    }

    onLoading(true);
    axios
      .post(
        `${url}/member/email/find/password`,
        {
          email: formState.inputs.email.value,
          name: formState.inputs.name.value,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(() => {
        setShowModal(true);
        onLoading(false);
      })
      .catch(err => {
        errorHandler(err);
      });
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showModal}
        header="이메일 발송 성공!"
        onCancel={closeModal}
        footer={
          <Button small width="60px" onClick={closeModal}>
            확인
          </Button>
        }
      >
        이메일 발송이 성공적으로 이루어졌습니다. <br />
        로그인 후 비밀번호 변경을 해주세요!
      </Modal>
      {isLoading && <LoadingSpinner asOverlay />}
      <FindUserBox onSubmit={sendPasswordHandler}>
        <FindUserInput
          bar
          element="input"
          id="name"
          type="text"
          label="이름"
          placeholder="이름을 입력해주세요"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="이름을 입력해주세요."
          onInput={inputHandler}
        />
        <FindUserInput
          bar
          element="input"
          id="email"
          label="email"
          type="text"
          placeholder="이메일 입력해주세요"
          validators={[VALIDATOR_EMAIL()]}
          errorText="이메일 형식에 알맞게 입력해주세요"
          onInput={inputHandler}
        />
        <Button type="submit" small width="120px">
          이메일 발송
        </Button>
      </FindUserBox>
    </>
  );
};

export default FindPwTab;
