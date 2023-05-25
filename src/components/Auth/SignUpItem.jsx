import React from "react";
import styled, { css } from "styled-components";

import Input from "../../components/UI/Input";
import SignUpAddress from "./SignUpAddress";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_PASSWORD,
  VALIDATOR_MATCH_PASSWORD,
} from "../../util/validators";

export const SignUpItem = styled.li`
  display: grid;
  grid-template-columns: 2fr 5fr 1.7fr;
  align-items: center;
  justify-items: end;
  margin: 25px 5rem 0 2rem;

  ${(props) =>
    props.lyt &&
    css`
      margin-top: 0;
      grid-template-columns: 7fr 1.7fr;
    `}

  > Input {
    grid-area: input;
  }
`;

export const SignUpLabel = styled.p`
  font-family: "SCDream";
  font-weight: 500;
  font-size: 16.5px;
`;

const ContentLine = styled.hr`
  width: 100%;
  margin-top: 25px;
  color: #dee2e6;
`;

const SignUpItems = (props) => {
  const { onInput, password } = props;

  return (
    <>
      <SignUpItem id='email'>
        <SignUpLabel>아이디</SignUpLabel>
      </SignUpItem>
      <ContentLine />
      <SignUpItem>
        <SignUpLabel>비밀번호</SignUpLabel>
        <Input
          element='input'
          type='password'
          id='password'
          width='17.5rem'
          placeholder='비밀번호 입력해주세요'
          validators={[VALIDATOR_PASSWORD()]}
          errorText='영문 대소문자, 숫자를 모두 포함하여 8~16자 입력해주세요'
          onInput={onInput}
        />
      </SignUpItem>
      <SignUpItem>
        <SignUpLabel>비밀번호 확인</SignUpLabel>
        <Input
          element='input'
          type='password'
          id='confirm_password'
          width='17.5rem'
          placeholder='비밀번호 재입력해주세요'
          validators={[VALIDATOR_MATCH_PASSWORD(password)]}
          errorText='비밀번호가 일치하지 않습니다'
          onInput={onInput}
        />
      </SignUpItem>
      <ContentLine />
      <SignUpItem>
        <SignUpLabel>이름(실명)</SignUpLabel>
        <Input
          element='input'
          type='text'
          id='name'
          width='17.5rem'
          placeholder='이름을 입력해주세요'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='이름을 입력해주세요'
          onInput={onInput}
        />
      </SignUpItem>
      <ContentLine />
      <SignUpItem>
        <SignUpLabel>닉네임</SignUpLabel>
        <Input
          element='input'
          type='text'
          id='nickname'
          width='17.5rem'
          placeholder='닉네임 입력해주세요'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='닉네임 입력해주세요'
          onInput={onInput}
        />
      </SignUpItem>
      <ContentLine />
      <SignUpAddress onInput={onInput} />
    </>
  );
};

export default SignUpItems;
