/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import axios from 'axios';
import theme from '../../styles/theme';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import ErrorModal from '../../util/ErrorModal';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { ImBubble } from 'react-icons/im';
import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../hooks/useAuth';
import { useLoadingError } from '../../hooks/useLoadingError';
import { VALIDATOR_REQUIRE } from '../../util/validators';

const SignInLayout = styled.form`
  margin: 9.5rem auto 0;
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'SCDream';

  > * {
    &:nth-child(2) {
      margin: 1rem 0;
    }

    &:nth-child(3) {
      margin-top: 1rem;
    }
  }

  @media ${theme.tablet}, ${theme.mobile} {
    margin: 10.5rem auto 0;
  }
`;

const ButtonBox = styled.div`
  position: relative;

  > * {
    &:nth-child(2) {
      color: black;
      background: #fee500;
    }
  }
`;

const KakaoIcon = styled(ImBubble)`
  position: absolute;
  font-size: 17.5px;
  top: 21px;
  left: 15px;
`;


const FindButtonBox = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0 0;
  font-size: 12px;

  > * {
    &:last-child {
      margin-right: 0.3rem;
      margin-left: 3.7rem;
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;

const SignUpBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  font-size: 0.75rem;

  > * {
    &:first-child {
      line-height: 1.1;

      > span {
        font-weight: 600;
      }
    }
    &:last-child {
      margin-right: 0.3rem;
      margin-left: 4rem;
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;


const SignIn = () => {
  const url = process.env.REACT_APP_URL;
  const auth = useAuth();
  const { isLoading, error, onLoading, clearError, errorHandler } =
      useLoadingError();
  const [formState, inputHandler] = useForm({}, false);

  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const KAKAO_AUTH_URL = `http://3.36.154.178:8080/oauth2/authorization/kakao`; // redirect - state save,  authorization - find

  const KakaoLoginHandler = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const SubmitHandler = e => {
    e.preventDefault();
    onLoading(true);
    axios
        .post(
            `${url}/auth/login`,
            {
              email: formState.inputs.email.value,
              password: formState.inputs.password.value,
            },
            { headers: { 'Content-Type': 'application/json' } },
        )
        .then(response => {
          if (response.status === 200) {
            const { accessToken, refreshToken, memberId } = response.data;
            auth.login(accessToken, refreshToken, memberId);
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
        <SignInLayout onSubmit={SubmitHandler}>
          {isLoading && <LoadingSpinner asOverlay />}
          <Input
              element="input"
              id="email"
              type="text"
              width="300px"
              placeholder="Email"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="이메일을 입력해주세요"
              onInput={inputHandler}
          />
          <Input
              element="input"
              id="password"
              type="password"
              width="300px"
              placeholder="Password"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="비밀번호를 입력해주세요"
              onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            로그인
          </Button>
          <ButtonBox>
            <KakaoIcon />
            <Button type="button" onClick={KakaoLoginHandler}>
              카카오 로그인
            </Button>
          </ButtonBox>
          <FindButtonBox>
            <p>비밀번호를 잊어버리셨나요?</p>
            <Link to="/finduser/password">비밀번호 찾기</Link>
          </FindButtonBox>
          <SignUpBox>
            <p>
              빌림의 회원이 되시면 <span>할인쿠폰</span>을 <br /> 드립니다.
            </p>
            <Link to="/emailverify">회원가입</Link>
          </SignUpBox>
        </SignInLayout>
      </>
  );
};

export default SignIn;

