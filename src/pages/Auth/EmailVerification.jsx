import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import theme from '../../styles/theme';
import Dropdown from '../../components/UI/DropDown';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorModal from '../../util/ErrorModal';
import { emailAction } from '../../store/signup';
import { Domain } from '../../data';
import { useForm } from '../../hooks/useForm';
import { VALIDATOR_REQUIRE } from '../../util/validators';

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
  margin: 2rem auto 1rem;
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
  const url = process.env.REACT_APP_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useSelector(state => state.email);
  const [selectedOpt, setSelectedOpt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
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

    if (!formState.isValid) {
      alert('빈칸 없이 작성해주세요.');
    }

    setIsLoading(true);
    const userEmail = `${email.email}@${email.domain}`;

    axios
      .post(
        `${url}/member/email/send`,
        { email: userEmail },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      .then(response => {
        if (response.status === 200) {
          navigate('/emailverify/confirm', { state: { email: userEmail } });
        } else {
          setError(response.data.message);
        }
        setIsLoading(false);
      })
      .catch(err => {
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError(err.message);
        }
        setIsLoading(false);
        throw err;
      });
  };

  return (
    <>
      <ErrorModal error={error} onClear={() => setError(null)} />
      <VerificationLayout className="center" onSubmit={emailSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
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
    </>
  );
};

export default EmailVerification;
