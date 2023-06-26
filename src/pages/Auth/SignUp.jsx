/* eslint-disable camelcase */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

import axios from 'axios';
import theme from '../../styles/theme';
import SignUpItems from '../../components/Auth/SignUpItem';
import Button from '../../components/UI/Button';
import ErrorModal from '../../util/ErrorModal';
import Modal from '../../components/UI/Modal';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { useForm } from '../../hooks/useForm';
import { useLoadingError } from '../../hooks/useLoadingError';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUpLayout = styled.form`
  width: 60%;
  max-width: 615px;
  margin: 85px auto 0;
  padding: 1.5rem 0;

  @media ${theme.desktop} {
    max-width: 900px;
  }
  @media ${theme.laptop} {
    width: 70%;
  }
  @media ${theme.mobile}, ${theme.tablet} {
    width: 75%;
    margin: 150px auto 0;
  }
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
  const url = process.env.REACT_APP_URL;
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = location?.state?.email;
  const { isLoading, error, onLoading, clearError, errorHandler } =
    useLoadingError();
  const [formState, inputHandler] = useForm({}, false);
  const { address, address_detail, address_legal } = formState.inputs;

  const [isCheckNickname, setIsCheckNickname] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);

  const closeModal = () => setShowModal(false);
  const closeSignUpModal = () => {
    setSignUpModal(false);
    navigate('/login');
  };

  const signUpSubmitHandler = e => {
    e.preventDefault();

    if (!formState.isValid) {
      alert('빈칸 없이 작성해주세요.');
      return;
    }

    if (isCheckNickname) {
      const combinedAddress = `${address.value} ${address_detail.value} ${address_legal.value}`;

      onLoading(true);
      axios
        .post(
          `${url}/member/signup`,
          {
            email: userEmail,
            password: formState.inputs.password.value,
            confirmPassword: formState.inputs.confirmPassword.value,
            name: formState.inputs.name.value,
            nickname: formState.inputs.nickname.value,
            address: combinedAddress,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            setSignUpModal(true);
          } else {
            errorHandler(response);
          }
          onLoading(false);
        })
        .catch(err => {
          errorHandler(err);
        });
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
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
      <Modal
        show={signUpModal}
        header="가입 완료"
        onCancel={closeSignUpModal}
        footer={
          <Button small width="60px" onClick={closeSignUpModal}>
            확인
          </Button>
        }
      >
        가입이 성공적으로 이루어졌습니다. <br />
        이제 로그인을 해주세요!
      </Modal>
      <ToastContainer
        position="top-center"
        limit={1}
        autoClose={3000}
        closeButton={false}
        closeOnClick
      />
      <SignUpLayout onSubmit={signUpSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <SignUpTitle>회원가입</SignUpTitle>
        <SignUpBox>
          <SignUpItems
            email={userEmail}
            onInput={inputHandler}
            password={formState.inputs.password}
            nickname={formState.inputs.nickname}
            setIsCheckNickname={setIsCheckNickname}
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
