import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const TabLayout = styled.div`
  width: 400px;
  margin: 7rem auto 0;
  display: flex;
  flex-direction: column;
`;

const TabMenu = styled.ul`
  color: black;
  font-weight: 700;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-family: 'TRoundWind';
`;

const TabItem = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 400px;
  padding: 10px;
  font-size: 18px;
  font-weight: 700;
  border-bottom: 3px solid ${props => (props.current ? 'black' : 'white')};
`;

const FindUserLayout = styled.div`
  padding: 1.8rem 0.7rem;
  font-family: 'SCDream';

  > * {
    &:nth-child(2) {
      margin: 1.6rem 0;
    }
  }
`;

const FindUser = () => {
  const currentTab = useLocation().pathname.slice(10);

  return (
    <TabLayout>
      <TabMenu>
        <TabItem
          to="/finduser/id"
          current={currentTab === 'id' ? 'current' : null}
        >
          아이디 찾기
        </TabItem>
        <TabItem
          to="/finduser/password"
          current={currentTab === 'password' ? 'current' : null}
        >
          비밀번호 찾기
        </TabItem>
      </TabMenu>
      <FindUserLayout>
        <Outlet />
      </FindUserLayout>
    </TabLayout>
  );
};

export default FindUser;
