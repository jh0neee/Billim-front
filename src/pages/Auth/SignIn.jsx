import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";

const SignInLayout = styled.div`
  margin-top: 8.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > * {
    &:nth-child(2) {
      margin: 1rem 0;
    }

    &:nth-child(3) {
      margin-top: 1rem;
    }
  }
`;

const FindButtonBox = styled.div`
  margin: 1rem 0 0 7.5rem;
  font-family: "SCDream";
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  > * {
    &:nth-child(2) {
      margin: 0 0.3rem;
    }
  }
`;

const SignIn = () => {
  return (
    <SignInLayout>
      <Input
        element='input'
        id='id'
        type='text'
        width='300px'
        placeholder='ID'
      />
      <Input
        element='input'
        id='password'
        type='text'
        width='300px'
        placeholder='Password'
      />
      <Button sub type='submit'>
        로그인
      </Button>
      <Button to='/signup'>회원가입</Button>
      <FindButtonBox>
        <Link to='/finduser' state={{ findId: true }}>
          아이디 찾기
        </Link>
        <span>|</span>
        <Link to='/finduser' state={{ findId: false }}>
          비밀번호 찾기
        </Link>
      </FindButtonBox>
    </SignInLayout>
  );
};

export default SignIn;
