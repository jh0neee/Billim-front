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

const EnterBox = styled.div`
  margin: 2rem 0 3rem;
  display: flex;
  justify-content: center;
  font-weight: 600;
`;

const SignUp = () => {
  const [formState, inputHandler] = useForm({}, false);
  const { address, address_detail, address_legal } = formState.inputs;

  const signUpSubmitHandler = (e) => {
    e.preventDefault();
    const combinedAddress = `${address.value} ${address_detail.value} ${address_legal.value}`;
    console.log(formState.inputs, combinedAddress);
  };

  return (
    <SignUpLayout onSubmit={signUpSubmitHandler}>
      <SignUpTitle>회원가입</SignUpTitle>
      <SignUpBox>
        <SignUpItems
          onInput={inputHandler}
          password={formState.inputs.password}
        />
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
