import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import Dropdown from '../../components/UI/DropDown';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import { emailAction } from '../../store/signup';
import { useForm } from '../../hooks/useForm';
import { VALIDATOR_REQUIRE } from '../../util/validators';
import { Domain } from '../../data';
import theme from '../../styles/theme';

const VerificationLayout = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'SCDream';
  width: 98%;
  margin: 7rem auto 0;
  padding: 1.5rem 0;

  > * {
    &:last-child {
      margin: 2rem;
    }
  }

  @media ${theme.tablet}, ${theme.mobile} {
    margin: 10rem auto 0;
  }
`;

const VerificationTitle = styled.div`
  font-family: 'TRoundWind';
  font-weight: 700;
  font-size: 1.7rem;
  text-align: center;
`;

const EmailBox = styled.div`
  margin: 3rem auto 1rem;
  width: 100%;
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

  @media ${theme.tablet}, ${theme.mobile} {
    margin-bottom: 0;
  }
`;

const EmailInput = styled(Input)`
  width: 150px;
  @media ${theme.tablet}, ${theme.mobile} {
    width: 136px;
  }
  @media ${theme.desktop} {
    width: 200px;
  }
`;

const EmailDropBox = styled(Dropdown)`
  width: 150px;
  @media ${theme.tablet}, ${theme.mobile} {
    width: 136px;
  }
  @media ${theme.desktop} {
    width: 200px;
  }
`;

const AtSignParagraph = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
`;

const EmailVerification = () => {
  const dispatch = useDispatch();
  const email = useSelector(state => state.email);
  const [selectedOpt, setSelectedOpt] = useState('');
  const [formState, inputHandler] = useForm({}, false);

  useEffect(() => {
    dispatch(
      emailAction.EMAIL_INPUT_CHANGE({
        inputValue: formState.inputs.email?.value,
        selectedOpt,
      }),
    );
  }, [dispatch, formState, selectedOpt]);

  const emailSubmitHandler = e => {
    e.preventDefault();
    console.log(email.email + '@' + email.domain);
  };

  return (
    <VerificationLayout className="center" onSubmit={emailSubmitHandler}>
      <VerificationTitle>이메일 인증</VerificationTitle>
      <EmailBox>
        <EmailInput
          element="input"
          id="email"
          type="text"
          placeholder="email"
          validators={[VALIDATOR_REQUIRE()]}
          errorText={null}
          onInput={inputHandler}
        />
        <AtSignParagraph>@</AtSignParagraph>
        <EmailDropBox
          options={Domain}
          selectedOpt={selectedOpt}
          setSelectedOpt={setSelectedOpt}
        />
      </EmailBox>
      <Button small width="120px" type="submit">
        인증하기
      </Button>
    </VerificationLayout>
  );
};

export default EmailVerification;
