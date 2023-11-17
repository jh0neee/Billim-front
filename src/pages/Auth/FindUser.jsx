import React from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';
import FindPwTab from '../../components/Auth/FindPwTab';

const TabLayout = styled.div`
  width: 400px;
  margin: 7rem auto 0;
  display: flex;
  flex-direction: column;

  @media ${theme.tablet} {
    margin-top: 10rem;
  }
  @media ${theme.mobile} {
    margin-top: 10rem;
    max-width: 350px;
  }
`;

const TabMenu = styled.ul`
  color: black;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'TRoundWind';
`;

const TabItem = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 400px;
  padding: 10px;
  font-size: 24px;
  font-weight: 700;
`;

const FindUserLayout = styled.div`
  padding: 1.8rem 0.7rem;
  font-family: 'SCDream';
`;

const NotificationText = styled.p`
  font-size: 0.7rem;
  font-weight: 400;
  color: #495057;
`;

const FindUser = () => {
  return (
    <TabLayout>
      <TabMenu>
        <TabItem to="/finduser/password">비밀번호 찾기</TabItem>
        <NotificationText>
          가입하신 이메일 주소로 임시비밀번호가 전송됩니다.
        </NotificationText>
      </TabMenu>
      <FindUserLayout>
        <FindPwTab />
      </FindUserLayout>
    </TabLayout>
  );
};

export default FindUser;
