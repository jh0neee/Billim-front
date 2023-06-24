import React from 'react';
import styled, { css } from 'styled-components';

import Input from '../../components/UI/Input';
import Button from '../UI/Button';
import SignUpAddress from './SignUpAddress';
import theme from '../../styles/theme';
import { useCheckNickname } from '../../hooks/useCheckedNickname';
import {
  VALIDATOR_PASSWORD,
  VALIDATOR_MATCH_PASSWORD,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_NAME,
} from '../../util/validators';

export const SignUpItem = styled.li`
  display: grid;
  grid-template-columns: ${({ email }) =>
    email ? '2fr 3.7fr 3fr' : '2fr 5fr 1.7fr'};
  align-items: center;
  justify-items: center;
  font-family: 'SCDream';

  @media ${theme.desktop} {
    ${props =>
      !props.lyt &&
      css`
        grid-template-columns: ${({ email }) =>
          email ? '3fr 2.7fr 3.3fr' : '3fr 4fr 2fr'};
      `}
  }
  @media ${theme.tablet} {
    grid-template-columns: ${({ email }) =>
      email ? '2.8fr 6fr 1fr' : '2fr 5fr'};
  }
  @media ${theme.mobile} {
    grid-template-columns: none;
  }

  ${props =>
    props.lyt &&
    css`
      margin-top: 0;
      justify-items: end;
      grid-template-columns: 2fr 0.7fr;

      @media ${theme.desktop} {
        grid-template-columns: 1.9fr 0.7fr;
      }
      @media ${theme.laptop} {
        grid-template-columns: 7fr 2.4fr;
      }
      @media ${theme.tablet} {
        grid-template-columns: none;
        padding-left: 22vw;
        justify-items: center;
        margin: 0;
      }
      @media ${theme.mobile} {
        grid-template-columns: none;
        justify-items: center;
        margin: 0;
        padding: 0;
      }
    `}
`;

export const SignUpLabel = styled.p`
  font-weight: 500;
  font-size: 16.5px;

  @media ${theme.mobile} {
    display: none;
  }
`;

const ContentLine = styled.hr`
  width: 100%;
  margin-top: 25px;
  color: #dee2e6;

  @media ${theme.mobile} {
    margin-top: 15px;
  }
`;

export const SignUpInput = styled(Input)`
  width: ${props => props.wth};

  @media ${theme.desktop} {
    width: ${({ extra }) => (extra ? '9rem' : '20rem')};
    padding-left: ${({ extra }) => (extra ? '1.5rem' : 'none')};
    justify-self: ${({ extra }) => (extra ? 'start' : 'none')};
  }
  @media ${theme.tablet} {
    width: 16rem;
  }
  @media ${theme.mobile} {
    width: 15.5rem;
  }
`;

export const SignUpButton = styled(Button)`
  width: 120px;

  @media ${theme.desktop} {
    justify-self: start;
    width: 7.5rem;
  }
  @media ${theme.laptop} {
    width: 7.5rem;
  }
  @media ${theme.tablet} {
    grid-area: 2 / 2 / 3 / 3;
    width: 10.5rem;
  }
  @media ${theme.mobile} {
    grid-area: 2 / 1 / 3 / 2;
    width: 6.5rem;
  }
`;

const SignUpItems = props => {
  const { email, onInput, password, nickname, setIsCheckNickname } = props;
  const [checkNickname] = useCheckNickname(nickname, setIsCheckNickname);

  return (
    <>
      <SignUpItem email>
        <SignUpLabel>아이디</SignUpLabel>
        <p>{email}</p>
      </SignUpItem>
      <ContentLine />
      <SignUpItem>
        <SignUpLabel>비밀번호</SignUpLabel>
        <SignUpInput
          element="input"
          type="password"
          id="password"
          wth="17.5rem"
          placeholder="비밀번호 입력해주세요"
          validators={[VALIDATOR_PASSWORD()]}
          errorText="영문 대소문자, 숫자, 특수문자를 모두 포함하여 8~16자 입력해주세요"
          onInput={onInput}
        />
      </SignUpItem>
      <SignUpItem>
        <SignUpLabel>비밀번호 확인</SignUpLabel>
        <SignUpInput
          element="input"
          type="password"
          id="confirm_password"
          wth="17.5rem"
          placeholder="비밀번호 재입력해주세요"
          validators={[VALIDATOR_MATCH_PASSWORD(password)]}
          errorText="비밀번호가 일치하지 않습니다"
          onInput={onInput}
        />
      </SignUpItem>
      <ContentLine />
      <SignUpItem>
        <SignUpLabel>이름(실명)</SignUpLabel>
        <SignUpInput
          element="input"
          type="text"
          id="name"
          wth="17.5rem"
          placeholder="이름을 입력해주세요"
          validators={[VALIDATOR_NAME()]}
          errorText="한글로 입력해주세요"
          onInput={onInput}
        />
      </SignUpItem>
      <ContentLine />
      <SignUpItem>
        <SignUpLabel>닉네임</SignUpLabel>
        <SignUpInput
          element="input"
          type="text"
          id="nickname"
          wth="17.5rem"
          placeholder="닉네임 입력해주세요"
          setIsCheckNickname={setIsCheckNickname}
          validators={[VALIDATOR_MINLENGTH(2), VALIDATOR_MAXLENGTH(10)]}
          errorText="2~10자 이내로 입력해주세요"
          onInput={onInput}
        />
        <SignUpButton type="button" sub small onClick={checkNickname}>
          중복 확인
        </SignUpButton>
      </SignUpItem>
      <ContentLine />
      <SignUpAddress onInput={onInput} />
    </>
  );
};

export default SignUpItems;
