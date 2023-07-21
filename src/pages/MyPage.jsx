import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

import axios from 'axios';
import theme from '../styles/theme';
import ErrorModal from '../util/ErrorModal';
import MyPageUser from '../components/MyPage/MyPageUser';
import MyPageSideBar from '../components/MyPage/MyPageSideBar';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import MyPageUserReward from '../components/MyPage/MyPageUserReward';
import { useAuth } from '../hooks/useAuth';
import { useLoadingError } from '../hooks/useLoadingError';

const MyPageContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

const MyPageLayout = styled.div`
  width: 70%;
  margin: 120px auto 0px;
  padding: auto 0;
  font-family: SCDream;
`;

const MyPageUserBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 47px;

  > * {
    &:first-child {
      display: flex;
      margin-left: 1rem;
    }
    &:last-child {
      display: flex;
    }
  }

  @media (min-width: 481px) and (max-width: 512px),
    (min-width: 675px) and (max-width: 1111px) {
    > * {
      &:first-child {
        flex-direction: column;
        align-items: center;
        width: 10rem;
      }
    }
  }

  @media ${theme.tablet} {
    margin-top: 150px;
  }

  @media ${theme.mobile} {
    margin-top: 150px;
    flex-direction: column;

    > * {
      &:first-child {
        margin: 0 auto;
      }
    }
  }
`;

const MyPageBox = styled.div`
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  column-gap: 3rem;

  @media ${theme.tablet} {
    grid-template-columns: 1fr;
    column-gap: 0;

    > * {
      &:first-child {
        display: none;
      }
    }
  }
`;

const MyPageContent = styled.div`
  padding-top: 1.5rem;

  > * {
    &:first-child {
      font-size: 1.5rem;
      font-weight: 600;
      padding-left: 1rem;
      padding-bottom: 0.5rem;
    }
  }
`;

const MyPage = () => {
  const url = process.env.REACT_APP_URL;
  const auth = useAuth();
  const { isLoading, onLoading, error, errorHandler, clearError } =
    useLoadingError();

  const [loadedUser, setLoadedUser] = useState([]);

  useEffect(() => {
    onLoading(true);
    axios
      .get(`${url}/member/my-page`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        params: {
          memberId: auth.memberId,
        },
      })
      .then(response => {
        setLoadedUser(response.data);
        onLoading(false);
      })
      .catch(err => {
        errorHandler(err);
      });
  }, []);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <MyPageContainer>
        <MyPageLayout>
          <MyPageUserBox>
            <MyPageUser user={loadedUser} />
            <MyPageUserReward user={loadedUser} />
          </MyPageUserBox>
          <MyPageBox>
            <MyPageSideBar />
            <MyPageContent>
              <Outlet />
            </MyPageContent>
          </MyPageBox>
        </MyPageLayout>
      </MyPageContainer>
    </>
  );
};

export default MyPage;
