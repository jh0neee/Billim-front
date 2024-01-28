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
import { useToastAlert } from '../../hooks/useToastAlert';
import { useLoadingError } from '../../hooks/useLoadingError';
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
    margin-left: 1rem;

    &:nth-child(2) {
      margin: 0 1rem;
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

const DirectInputBox = styled.div`
  height: 3.7rem;
`;

const DirectInput = styled(EmailInput)`
  z-index: 1;
`;

const DirectInputDropBox = styled(EmailDropBox)`
  bottom: 52px;
  left: 40px;

  .directInput {
    border: none;
    background: transparent;
    justify-content: space-between;
    height: 43px;
  }

  .directInputDrop {
    left: -20%;

    @media (max-width: 768px) {
      left: -30%;
    }
    @media (min-width: 769px) and (max-width: 1439px) {
      left: -27%;
    }
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
  const { showToast } = useToastAlert();
  const { isLoading, error, onLoading, clearError, errorHandler } =
    useLoadingError();
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
      showToast('빈칸 없이 작성해주세요.', 'warning');
      return;
    }

    onLoading(true);

    let userEmail;
    if (email.domain === '직접입력') {
      userEmail = `${email.email}@${formState.inputs.domain?.value}`;
    } else {
      userEmail = `${email.email}@${email.domain}`;
    }

    axios
      .post(
        `${url}/email/send`,
        { email: userEmail },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      .then(response => {
        if (response.status === 200) {
          navigate('/emailverify/confirm', { state: { email: userEmail } });
        } else {
          errorHandler(response);
        }
        onLoading(false);
      })
      .catch(err => {
        errorHandler(err);
      });
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
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
          {email.domain === '직접입력' && (
            <DirectInputBox>
              <DirectInput
                element="input"
                id="domain"
                type="text"
                placeholder="직접입력"
                validators={[VALIDATOR_REQUIRE()]}
                errorText={null}
                onInput={inputHandler}
              />
              <DirectInputDropBox
                options={Domain}
                selectedOpt={selectedOpt}
                setSelectedOpt={setSelectedOpt}
              />
            </DirectInputBox>
          )}
          {email.domain !== '직접입력' && (
            <EmailDropBox
              options={Domain}
              selectedOpt={selectedOpt}
              setSelectedOpt={setSelectedOpt}
            />
          )}
        </EmailBox>
        <Button small width="120px" type="submit">
          인증하기
        </Button>
      </VerificationLayout>
    </>
  );
};

export default EmailVerification;
