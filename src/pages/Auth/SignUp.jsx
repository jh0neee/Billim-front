/* eslint-disable camelcase */
import React, { useState } from 'react';
import styled from 'styled-components';

import SignUpItems from '../../components/Auth/SignUpItem';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';
import { useForm } from '../../hooks/useForm';

const SignUpLayout = styled.form`
  width: 60%;
  margin: 85px auto 0;
  padding: 1.5rem 0;
`;

const SignUpTitle = styled.p`
  font-family: 'TRoundWind';
  font-weight: 700;
  font-size: 1.7rem;
  text-align: center;
`;

const SignUpBox = styled.div`
  margin: 3rem 0 0;
`;

const EnterBox = styled.div`
  margin: 2rem 0 3rem;
  display: flex;
  justify-content: center;
  font-weight: 600;
`;

const SignUp = () => {
  const [formState, inputHandler] = useForm({}, false);
  const { address, address_detail, address_legal } = formState.inputs;

  const [isCheckSignUp, setIsCheckSignUp] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => setShowModal(false);

  const signUpSubmitHandler = e => {
    e.preventDefault();

    if (isCheckSignUp) {
      const combinedAddress = `${address.value} ${address_detail.value} ${address_legal.value}`;
      console.log(formState.inputs, combinedAddress);
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <Modal
        show={showModal}
        header="중복 확인"
        onCancel={closeModal}
        footer={
          <Button small width="60px" onClick={closeModal}>
            확인
          </Button>
        }
      >
        닉네임 중복 체크를 먼저 해 주세요
      </Modal>
      <SignUpLayout onSubmit={signUpSubmitHandler}>
        <SignUpTitle>회원가입</SignUpTitle>
        <SignUpBox>
          <SignUpItems
            onInput={inputHandler}
            password={formState.inputs.password}
            nickname={formState.inputs.nickname}
            setIsCheckSignUp={setIsCheckSignUp}
          />
        </SignUpBox>
        <EnterBox>
          <Button type="submit" width="15rem">
            회원가입하기
          </Button>
        </EnterBox>
      </SignUpLayout>
    </>
  );
};

export default SignUp;
