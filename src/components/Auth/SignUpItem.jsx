import React from 'react';
import styled, { css } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

import Input from '../../components/UI/Input';
import SignUpAddress from './SignUpAddress';
import {
  VALIDATOR_PASSWORD,
  VALIDATOR_MATCH_PASSWORD,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_NAME,
} from '../../util/validators';
import Button from '../UI/Button';
import { toast, ToastContainer } from 'react-toastify';
import { review } from '../../data';

export const SignUpItem = styled.li`
  display: grid;
  grid-template-columns: 2fr 5fr 1.7fr;
  align-items: center;
  justify-items: end;
  margin: 25px 5rem 0 2rem;

  ${props =>
    props.lyt &&
    css`
      margin-top: 0;
      grid-template-columns: 7fr 1.7fr;
    `}
`;

export const SignUpLabel = styled.p`
  font-family: 'SCDream';
  font-weight: 500;
  font-size: 16.5px;
`;

const ContentLine = styled.hr`
  width: 100%;
  margin-top: 25px;
  color: #dee2e6;
`;

const SignUpItems = props => {
  const { onInput, password, nickname, setIsCheckSignUp } = props;

  const checkNickname = () => {
    const isCheck = review.map(item => item.username).includes(nickname.value);

    if (nickname.value === '') {
      toast.warning('닉네임을 입력해주세요');
    } else if (!nickname.isValid) {
      toast.warning('닉네임은 2~10자로 입력해주세요');
    } else {
      if (isCheck) {
        toast.error('이미 사용중인 닉네임입니다.');
        setIsCheckSignUp(false);
      } else {
        toast.success('사용가능한 닉네임입니다.');
        setIsCheckSignUp(true);
      }
    }
  };

  return (
    <>
      <SignUpItem id="email">
        <SignUpLabel>아이디</SignUpLabel>
      </SignUpItem>
      <ContentLine />
      <SignUpItem>
        <SignUpLabel>비밀번호</SignUpLabel>
        <Input
          element="input"
          type="password"
          id="password"
          width="17.5rem"
          placeholder="비밀번호 입력해주세요"
          validators={[VALIDATOR_PASSWORD()]}
          errorText="영문 대소문자, 숫자를 모두 포함하여 8~16자 입력해주세요"
          onInput={onInput}
        />
      </SignUpItem>
      <SignUpItem>
        <SignUpLabel>비밀번호 확인</SignUpLabel>
        <Input
          element="input"
          type="password"
          id="confirm_password"
          width="17.5rem"
          placeholder="비밀번호 재입력해주세요"
          validators={[VALIDATOR_MATCH_PASSWORD(password)]}
          errorText="비밀번호가 일치하지 않습니다"
          onInput={onInput}
        />
      </SignUpItem>
      <ContentLine />
      <SignUpItem>
        <SignUpLabel>이름(실명)</SignUpLabel>
        <Input
          element="input"
          type="text"
          id="name"
          width="17.5rem"
          placeholder="이름을 입력해주세요"
          validators={[VALIDATOR_NAME()]}
          errorText="한글로 입력해주세요"
          onInput={onInput}
        />
      </SignUpItem>
      <ContentLine />
      <SignUpItem>
        <SignUpLabel>닉네임</SignUpLabel>
        <Input
          element="input"
          type="text"
          id="nickname"
          width="17.5rem"
          placeholder="닉네임 입력해주세요"
          validators={[VALIDATOR_MINLENGTH(2), VALIDATOR_MAXLENGTH(10)]}
          errorText="2~10자 이내로 입력해주세요"
          onInput={onInput}
        />
        <Button type="button" sub small width="120px" onClick={checkNickname}>
          중복 확인
        </Button>
        <ToastContainer
          position="top-center"
          limit={1}
          autoClose={3000}
          closeButton={false}
          closeOnClick
        />
      </SignUpItem>
      <ContentLine />
      <SignUpAddress onInput={onInput} />
    </>
  );
};

export default SignUpItems;
