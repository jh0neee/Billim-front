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

const SignUpItems = (props) => {
  const { id, label, placeholder } = props;

  if (id === "email") {
    return (
      <SignUpItem>
        <SignUpLabel>아이디</SignUpLabel>
      </SignUpItem>
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
        </SignUpItem>
        <SignUpItem lyt>
          <Input
            element='input'
            type='text'
            id={`${id}_detail`}
            width='17.5rem'
            placeholder='상세주소 입력해주세요'
          />
          <Input
            element='input'
            type='text'
            id={`${id}_legal`}
            width='7.5rem'
            placeholder='(법정동)'
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
