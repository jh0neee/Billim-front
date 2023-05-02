import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import FindUserTab from "../../components/Auth/FindUserTab";

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
  font-family: "TRoundWind";
`;

const TabItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 400px;
  padding: 10px;
  font-size: 18px;
  font-weight: 700;
  border-bottom: 3px solid ${(props) => (props.currentTab ? "black" : "white")};
`;

const FindUserLayout = styled.div`
  padding: 1.8rem 0.7rem;
  font-family: "SCDream";

  > * {
    &:nth-child(2) {
      margin: 1.6rem 0;
    }
  }
`;

const FindUser = () => {
  const location = useLocation();
  const { findId } = location.state;

  const [activeTab, setActiveTab] = useState(findId === true);

  const IdTabHandler = () => {
    setActiveTab(true);
  };
  const PwTabHandler = () => {
    setActiveTab(false);
  };

  return (
    <TabLayout>
      <TabMenu>
        <TabItem
          currentTab={activeTab === true && "currentTab"}
          onClick={IdTabHandler}>
          아이디 찾기
        </TabItem>
        <TabItem
          currentTab={activeTab === false && "currentTab"}
          onClick={PwTabHandler}>
          비밀번호 찾기
        </TabItem>
      </TabMenu>
      <FindUserLayout>
        {activeTab === true ? (
          <FindUserTab label='이름' />
        ) : (
          <FindUserTab label='아이디' />
        )}
      </FindUserLayout>
    </TabLayout>
  );
};

export default FindUser;
