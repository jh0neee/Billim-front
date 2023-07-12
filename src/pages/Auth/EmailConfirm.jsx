import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import axios from 'axios';
import theme from '../../styles/theme';
import ErrorModal from '../../util/ErrorModal';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { useLoadingError } from '../../hooks/useLoadingError';
import { TbMailCheck } from 'react-icons/tb';

const ConfirmLayout = styled.div`
  font-family: 'SCDream';
  width: 90%;
  max-width: 25rem;
  margin: 7rem auto;
  text-align: center;
  padding: 1rem 0px;
  height: 300px;

  @media ${theme.tablet}, ${theme.mobile} {
    margin: 10rem auto 0;
  }
`;

const MainParagraph = styled.p`
  margin: 1rem 0 1.8rem;
  line-height: 1.3;

  > span {
    font-weight: 600;
    font-family: 'TRoundWind';
  }
`;

const MailParagraph = styled.p`
  margin-bottom: 2rem;
`;

const Description = styled.div`
  font-size: 0.75rem;
  line-height: 1.3;
`;

const EmailConfirm = () => {
  const url = process.env.REACT_APP_URL;
  const location = useLocation();
  const navigate = useNavigate();
  const userEmail = location?.state?.email;

  const { isLoading, error, onLoading, clearError, errorHandler } =
    useLoadingError();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');
    const authToken = searchParams.get('authToken');

    const sendVerification = () => {
      onLoading(true);

      axios
        .post(
          `${url}/email/confirm`,
          { email, authToken },
          {
            headers: { 'Content-Type': 'application/json' },
          },
        )
        .then(response => {
          if (response.status === 200) {
            navigate('/signup', { state: { email } });
          } else {
            errorHandler(response);
          }
          onLoading(false);
        })
        .catch(err => {
          errorHandler(err);
        });
    };

    if (email && authToken) {
      sendVerification();
    }
  }, []);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <ConfirmLayout>
        {isLoading && <LoadingSpinner asOverlay />}
        <TbMailCheck color="#fcd34d" size="100px" />
        <MainParagraph>
          환영합니다! <br />
          <span>이메일 주소</span>를 인증해주세요.
        </MainParagraph>
        <MailParagraph>{userEmail}</MailParagraph>
        <Description>
          이메일 인증을 위한 메일이 발송되었습니다.
          <br />
          회원가입을 위한 이메일 인증을 진행 해 주세요.
        </Description>
      </ConfirmLayout>
    </>
  );
};

export default EmailConfirm;
