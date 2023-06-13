import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

import MyPageUser from '../components/MyPage/MyPageUser';
import MyPageSideBar from '../components/MyPage/MyPageSideBar';
import MyPageUserReward from '../components/MyPage/MyPageUserReward';

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
  margin-bottom: 2rem;

  > * {
    &:first-child {
      display: flex;
      margin-left: 1rem;
    }
    &:last-child {
      display: flex;
    }
  }
`;

const MyPageBox = styled.div`
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  column-gap: 3rem;
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
  return (
    <MyPageLayout>
      <MyPageUserBox>
        <MyPageUser />
        <MyPageUserReward />
      </MyPageUserBox>
      <MyPageBox>
        <MyPageSideBar />
        <MyPageContent>
          <Outlet />
        </MyPageContent>
      </MyPageBox>
    </MyPageLayout>
  );
};

export default MyPage;
