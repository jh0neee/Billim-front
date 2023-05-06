import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Dropdown from "../../components/UI/DropDown";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { emailAction } from "../../store/signup";

const VerificationLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "SCDream";
  width: 60%;
  margin: 85px auto 0;
  padding: 1.5rem 0;

  > * {
    &:last-child {
      margin: 2rem;
    }
  }
`;

const VerificationTitle = styled.div`
  font-family: "TRoundWind";
  font-weight: 700;
  font-size: 1.7rem;
  text-align: center;
`;

const EmailBox = styled.div`
  margin: 3rem auto 0;
  display: flex;
  align-items: center;
  justify-content: center;

  > * {
    &:nth-child(2) {
      margin: 0 1rem;
    }
    &:nth-child(odd) {
      margin-left: 1rem;
    }
  }
`;

const AtSignParagraph = styled.p`
  font-weight: 700;
`;

const options = [
  { id: 1, item: "naver.com" },
  { id: 2, item: "gmail.com" },
  { id: 3, item: "daum.net" },
  { id: 4, item: "nate.com" },
  { id: 5, item: "hanmail.net" },
];

const EmailVerification = () => {
  const [text, setText] = useState("");
  const [selectedOpt, setSelectedOpt] = useState("");
  const dispatch = useDispatch();
  const email = useSelector((state) => state.email);

  const onChange = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    dispatch(
      emailAction.EMAIL_INPUT_CHANGE({
        inputValue: text,
        selectedOpt,
      })
    );
  }, [dispatch, text, selectedOpt]);

  const onSubmit = () => {
    console.log(email.email + "@" + email.domain);
  };

  return (
    <VerificationLayout>
      <VerificationTitle>이메일 인증</VerificationTitle>
      <EmailBox>
        <Input
          element='input'
          id='email'
          type='text'
          width='150px'
          placeholder='email'
          onChange={onChange}
          value={text}
        />
        <AtSignParagraph>@</AtSignParagraph>
        <Dropdown
          options={options}
          selectedOpt={selectedOpt}
          setSelectedOpt={setSelectedOpt}
        />
      </EmailBox>
      <Button small width='100px' onClick={onSubmit}>
        인증 받기
      </Button>
    </VerificationLayout>
  );
};

export default EmailVerification;
