import React from "react";
import styled, { css } from "styled-components";

import Input from "../../components/UI/Input";
import Button from "../UI/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_PASSWORD,
  VALIDATOR_MATCH_PASSWORD,
} from "../../util/validators";

const SignUpItem = styled.li`
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

const SignUpLabel = styled.p`
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
      <SignUpItem>
        <SignUpLabel>주소</SignUpLabel>
        <Input
          element='input'
          id='address'
          type='text'
          width='17.5rem'
          placeholder='우편번호'
          validators={[VALIDATOR_REQUIRE()]}
          errorText={null}
          onInput={onInput}
        />
        <Button sub small width='120px'>
          우편번호 찾기
        </Button>
      </SignUpItem>
      <SignUpItem lyt>
        <Input
          element='input'
          type='text'
          id='address_street'
          width='17.5rem'
          placeholder='도로명주소'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='주소를 입력해주세요'
          onInput={onInput}
        />
      </SignUpItem>
      <SignUpItem lyt>
        <Input
          element='input'
          type='text'
          id='address_detail'
          width='17.5rem'
          placeholder='상세주소 입력해주세요'
          validators={[VALIDATOR_REQUIRE()]}
          errorText={null}
          onInput={onInput}
        />
        <Input
          element='input'
          type='text'
          id='address_legal'
          width='7.5rem'
          placeholder='(법정동)'
          validators={[VALIDATOR_REQUIRE()]}
          errorText={null}
          onInput={onInput}
        />
      </SignUpItem>
    </>
  );
};

export default SignUpItems;
