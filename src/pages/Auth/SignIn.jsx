import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { ImBubble } from "react-icons/im";

import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";

const SignInLayout = styled.div`
  margin-top: 8.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "SCDream";

  > * {
    &:nth-child(2) {
      margin: 1rem 0;
    }

    &:nth-child(3) {
      margin-top: 1rem;
    }
  }
`;

const ButtonBox = styled.div`
  position: relative;

  > * {
    &:nth-child(2) {
      color: black;
      background: #fee500;
    }
  }
`;

const KakaoIcon = styled(ImBubble)`
  position: absolute;
  font-size: 17.5px;
  top: 21px;
  left: 15px;
`;

const FindButtonBox = styled.div`
  margin: 1rem 0 1rem 7.5rem;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  > * {
    &:nth-child(2) {
      margin: 0 0.3rem;
    }
  }
`;

const SignUpBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.5rem;
  > * {
    &:first-child {
      margin-right: 1.5rem;
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
      <Button type='submit'>로그인</Button>
      <FindButtonBox>
        <Link to='/finduser' state={{ findId: true }}>
          아이디 찾기
        </Link>
        <span>|</span>
        <Link to='/finduser' state={{ findId: false }}>
          비밀번호 찾기
        </Link>
      </FindButtonBox>
      <ButtonBox>
        <KakaoIcon />
        <Button>카카오 로그인</Button>
      </ButtonBox>
      <SignUpBox>
        <p>
          빌림의 회원이 되시면 <br />
          만원 할인쿠폰을 드립니다.
        </p>
        <Button $sub $small to='/emailverify' width='80px'>
          회원가입
        </Button>
      </SignUpBox>
    </SignInLayout>
  );
};

export default SignIn;
