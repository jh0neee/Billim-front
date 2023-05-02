import React from "react";
import styled from "styled-components";
import SignUpItems from "../../components/Auth/SignUpItem";
import Button from "../../components/UI/Button";

const SignUpLayout = styled.div`
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

// height 38px
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
  return (
    <SignUpLayout>
      <SignUpTitle>회원가입</SignUpTitle>
      <SignUpBox>
        <SignUpItems label='아이디' id='id' placeholder='4~20자 사이 영소문자,숫자' />
        <ContentLine />
        <SignUpItems
          label='비밀번호'
          id='pw'
          placeholder='8~16자 사이 영문 대,소문자'
        />
        <SignUpItems
          label='비밀번호 확인'
          id='repw'
          placeholder='비밀번호 재입력해주세요'
        />
        <ContentLine />
        <SignUpItems
          label='이름(실명)'
          id='name'
          placeholder='이름 입력해주세요'
        />
        <ContentLine />
        <SignUpItems
          label='닉네임'
          id='nickname'
          placeholder='닉네임 입력해주세요'
        />
        <ContentLine />
        <SignUpItems label='이메일' id='email' />
        <ContentLine />
        <SignUpItems label='주소' id='address' />
        <ContentLine />
      </SignUpBox>
      <EnterBox>
        <Button width='15rem'>
          회원가입하기
        </Button>
      </EnterBox>
    </SignUpLayout>
  );
};

export default SignUp;
