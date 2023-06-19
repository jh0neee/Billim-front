import React, { useState } from 'react';
import styled from 'styled-components';

import Input from '../UI/Input';
import Button from '../UI/Button';
import useTimer from '../../hooks/useTimer';
import { useForm } from '../../hooks/useForm';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_NUMBER,
  VALIDATOR_REQUIRE,
} from '../../util/validators';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import theme from '../../styles/theme';

const FindUserBox = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const FindUserInput = styled(Input)`
  > input {
    width: 250px;

    @media ${theme.mobile} {
      width: 200px;
    }
  }
`;

const FindUserVerifyInput = styled(Input)`
  > input {
    @media ${theme.mobile} {
      width: 170px;
    }
  }
`;

const TimeOut = styled.p`
  padding: 20px 20px 15px 15px;
`;

const TimeOutMessage = styled.p`
  font-size: 0.5rem;
  color: red;
`;

const FindPwTab = () => {
  // NOTE - 인증 확인되는 즉시 비밀번호 재설정 페이지로 이동
  const [emailSent, setEmailSent] = useState(false);
  const [formState, inputHandler] = useForm({}, false);
  const { timer, isExpired, resetTimer } = useTimer(179);

  const sendVerificationCodeHandler = e => {
    e.preventDefault();

    resetTimer();
    setEmailSent(true);
    toast.success('인증번호가 발송되었습니다.');
    console.log(formState.inputs.id, formState.inputs.email);
  };

  const handleVerifyEmail = e => {
    e.preventDefault();

    console.log(formState.inputs.code);
  };

  return (
    <>
      <Input
        bar
        element="input"
        id="id"
        type="text"
        label="아이디"
        placeholder="아이디 입력해주세요"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="아이디를 입력해주세요."
        onInput={inputHandler}
      />
      <FindUserBox onSubmit={sendVerificationCodeHandler}>
        <FindUserInput
          bar
          element="input"
          id="email"
          type="text"
          label="이메일"
          placeholder="이메일 입력해주세요"
          validators={[VALIDATOR_EMAIL()]}
          errorText="이메일 형식에 알맞게 입력해주세요"
          onInput={inputHandler}
        />
        <Button type="submit" sub small width="120px">
          인증번호 발송
        </Button>
        <ToastContainer
          limit={1}
          autoClose={3000}
          closeButton={false}
          closeOnClick
        />
      </FindUserBox>
      <FindUserBox onSubmit={handleVerifyEmail}>
        <FindUserVerifyInput
          bar
          element="input"
          id="code"
          type="text"
          label="인증번호"
          placeholder="인증번호 입력해주세요"
          validators={[VALIDATOR_NUMBER()]}
          errorText={null}
          onInput={inputHandler}
        />
        {emailSent && <TimeOut>{timer > '00:00' ? timer : '00:00'}</TimeOut>}
        <Button
          type="submit"
          sub
          small
          width="125px"
          disabled={!formState.isValid || isExpired}
        >
          인증하기
        </Button>
      </FindUserBox>
      {!formState.isValid && (
        <TimeOutMessage>숫자만 입력해주세요.</TimeOutMessage>
      )}
      {isExpired && (
        <TimeOutMessage>
          인증 시간이 만료되었습니다. 인증번호를 재발급해주세요.
        </TimeOutMessage>
      )}
    </>
  );
};

export default FindPwTab;
