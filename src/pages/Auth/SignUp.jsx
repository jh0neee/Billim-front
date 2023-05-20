import React from "react";
import styled from "styled-components";

import SignUpItems from "../../components/Auth/SignUpItem";
import Button from "../../components/UI/Button";
import { useForm } from "../../hooks/useForm";

const SignUpLayout = styled.form`
  width: 60%;
  margin: 85px auto 0;
  padding: 1.5rem 0;
`;

const SignUpTitle = styled.p`
  font-family: "TRoundWind";
  font-weight: 700;
  font-size: 1.7rem;
  text-align: center;
`;

const SignUpBox = styled.div`
  margin: 3rem 0 0;
`;

const ContentLine = styled.hr`
  width: 100%;
  margin-top: 25px;
  color: #dee2e6;
`;

const EnterBox = styled.div`
  margin: 2rem 0 3rem;
  display: flex;
  justify-content: center;
  font-weight: 600;
`;

const SignUp = () => {
  const [formState, inputHandler] = useForm({}, false);

  const signUpSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <SignUpLayout onSubmit={signUpSubmitHandler}>
      <SignUpTitle>회원가입</SignUpTitle>
      <SignUpBox>
        <SignUpItems id='email'>아이디</SignUpItems>
        <ContentLine />
        <SignUpItems
          label='비밀번호'
          id='password'
          placeholder='8~16자 사이 영문 대,소문자'
          onInput={inputHandler}
        />
        <SignUpItems
          label='비밀번호 확인'
          id='repassword'
          placeholder='비밀번호 재입력해주세요'
          onInput={inputHandler}
        />
        <ContentLine />
        <SignUpItems
          label='이름(실명)'
          id='name'
          placeholder='이름 입력해주세요'
          onInput={inputHandler}
        />
        <ContentLine />
        <SignUpItems
          label='닉네임'
          id='nickname'
          placeholder='닉네임 입력해주세요'
          onInput={inputHandler}
        />
        <ContentLine />
        <SignUpItems label='주소' id='address' onInput={inputHandler} />
        <ContentLine />
      </SignUpBox>
      <EnterBox>
        <Button type='submit' width='15rem'>
          회원가입하기
        </Button>
      </EnterBox>
    </SignUpLayout>
  );
};

export default SignUp;
