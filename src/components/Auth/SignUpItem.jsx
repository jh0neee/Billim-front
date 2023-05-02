import React from "react";
import styled, { css } from "styled-components";

import Input from "../../components/UI/Input";
import Button from "../UI/Button";

const SignUpItem = styled.li`
  display: grid;
  grid-template-columns: 2fr 5fr 1.7fr;
  align-items: center;
  justify-items: end;
  margin: 25px 5rem 0 2rem;

  ${(props) =>
    props.lytexp &&
    css`
      margin-top: 0;
      grid-template-columns: 6fr 1fr 1.7fr;
    `}

  ${(props) =>
    props.lyt &&
    css`
      margin-top: 0;
      grid-auto-flow: column;
      grid-template-columns: 7fr 1.7fr;
      grid-template-areas:
        "input ."
        "input .";
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

const TimeOut = styled.p`
  padding: 20px 20px;
`;

const SignUpItems = (props) => {
  const { id, label, placeholder } = props;

  if (id === "email") {
    return (
      <>
        <SignUpItem>
          <SignUpLabel>{label}</SignUpLabel>
          <Input
            element='input'
            id={id}
            type='text'
            width='17.5rem'
            placeholder='예) bilim53645@blm.com'
          />
          <Button sub small width='120px'>
            인증번호 발송
          </Button>
        </SignUpItem>
        <SignUpItem lytexp>
          <Input
            element='input'
            id={`${id}_code`}
            type='text'
            width='12.8rem'
            placeholder='인증번호'
          />
          <TimeOut>3:00</TimeOut>
          <Button sub small width='120px'>
            인증하기
          </Button>
        </SignUpItem>
      </>
    );
  }

  if (id === "address") {
    return (
      <>
        <SignUpItem>
          <SignUpLabel>{label}</SignUpLabel>
          <Input
            element='input'
            id={id}
            type='text'
            width='17.5rem'
            placeholder='우편번호'
          />
          <Button sub small width='120px'>
            우편번호 찾기
          </Button>
        </SignUpItem>
        <SignUpItem lyt>
          <Input
            element='input'
            type='text'
            id={`${id}_street`}
            width='17.5rem'
            placeholder='도로명주소'
          />
          <Input
            element='input'
            type='text'
            id={`${id}_detail`}
            width='17.5rem'
            placeholder='상세주소 입력해주세요'
          />
        </SignUpItem>
      </>
    );
  }

  return (
    <SignUpItem>
      <SignUpLabel>{label}</SignUpLabel>
      <Input
        element='input'
        type='text'
        id={id}
        width='17.5rem'
        placeholder={placeholder}
      />
    </SignUpItem>
  );
};

export default SignUpItems;
