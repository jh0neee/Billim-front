import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import axios from 'axios';
import theme from '../../styles/theme';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import ErrorModal from '../../util/ErrorModal';
import kakaoMedium from '../../asset/image/kakao_login_medium_wide.png';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
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
  }

  @media ${theme.tablet}, ${theme.mobile} {
    margin: 10.5rem auto 0;
  }
`;

const LoginButton = styled(Button)`
  border-radius: 6px;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.5px;
`;

const KakaoLoginButton = styled.img`
  cursor: pointer;
`;

const DividingLine = styled.span`
  position: relative;
  display: block;
  width: 100%;
  padding: 18px 0;
  font-size: 0;
  line-height: 0;

  &::before {
    display: inline-block;
    width: calc(50% - 20px);
    height: 1px;
    margin: 8px 0;
    background-color: rgba(0, 0, 0, 0.06);
    vertical-align: top;
    content: '';
  }

  &::after {
    display: inline-block;
    width: calc(50% - 20px);
    height: 1px;
    margin: 8px 0;
    background-color: rgba(0, 0, 0, 0.06);
    vertical-align: top;
    content: '';
  }
`;

const OrText = styled.span`
  font-family: 'TRoundWind';
  letter-spacing: 1.5px;
  display: inline-block;
  width: 40px;
  font-size: 10px;
  line-height: 18px;
  text-align: center;
  color: #828282;
`;

const FindButtonBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 0 0;
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
  margin-top: 0.8rem;
  font-size: 0.75rem;

  > * {
    &:first-child {
      line-height: 1.1;

      > span {
        font-weight: 600;
      }
    }
    &:last-child {
      margin-right: 0.33rem;
      margin-left: 3rem;
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

  const KAKAO_AUTH_URL = `http://localhost:8080/oauth2/authorization/kakao`;

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
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
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
        <LoginButton type="submit" disabled={!formState.isValid}>
          로그인
        </LoginButton>
        <FindButtonBox>
          <p>비밀번호를 잊어버리셨나요?</p>
          <Link to="/finduser/password">비밀번호 찾기</Link>
        </FindButtonBox>
        <SignUpBox>
          <p>
            회원이 되시면 <span>할인쿠폰</span>을 드립니다.
          </p>
          <Link to="/emailverify">회원가입</Link>
        </SignUpBox>
        <DividingLine>
          <OrText>OR</OrText>
        </DividingLine>
        <KakaoLoginButton src={kakaoMedium} onClick={KakaoLoginHandler} />
      </SignInLayout>
    </>
  );
};

export default SignIn;
