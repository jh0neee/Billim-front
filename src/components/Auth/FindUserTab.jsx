import React from "react";
import styled from "styled-components";

import Input from "../UI/Input";
import Button from "../UI/Button";

const FindUserBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const TimeOut = styled.p`
  padding: 20px 20px 15px 15px;
`;

const FindUserTab = (props) => {
  //NOTE - 인증 확인되는 즉시 비밀번호 재설정 페이지로 이동
  return (
    <>
      <Input
        bar
        element='input'
        id='name'
        type='text'
        label={props.label}
        placeholder={`${props.label} 입력해주세요`}
      />
      <FindUserBox>
        <Input
          bar
          element='input'
          id='email'
          type='text'
          label='이메일'
          width='250px'
          placeholder='이메일 입력해주세요'
        />
        <Button sub small width='120px'>
          인증번호 발송
        </Button>
      </FindUserBox>
      <FindUserBox>
        <Input
          bar
          element='input'
          id='code'
          type='text'
          label='인증번호'
          placeholder='인증번호 입력해주세요'
        />
        <TimeOut>3:00</TimeOut>
        <Button sub small width='125px'>
          인증하기
        </Button>
      </FindUserBox>
    </>
  );
};

export default FindUserTab;
