import React from "react";
import styled from "styled-components";

import { TbUserCircle } from "react-icons/tb";
import { Link } from "react-router-dom";

const UserBox = styled.div`
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

const UserParagraphBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 1rem;
  padding-left: 1rem;

  > * {
    &:last-child {
      display: flex;
      margin-top: 0.5rem;
    }
  }
`;

const UserItemBox = styled.div`
  background-color: #ededed;
  width: 130px;
  height: 110px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  padding: 1.2rem 0.8rem 0.8rem 0.8rem;
  margin: 0 1.5rem;
  font-weight: 600;

  > * {
    &:last-child {
      font-size: 1.3rem;
    }
  }
`;

const MyPageUser = () => {
  return (
    <UserBox>
      <div>
        <TbUserCircle size='130px' />
        <UserParagraphBox>
          <p>닉네임</p>
          <div>
            <p>LV.</p>
            <p>가입일</p>
          </div>
        </UserParagraphBox>
      </div>
      <div>
        <UserItemBox>
          <p>적립금</p>
          <p>3000</p>
        </UserItemBox>
        <UserItemBox>
          <p>쿠폰</p>
          <p>3</p>
        </UserItemBox>
        <UserItemBox>
          <p>후기작성</p>
          <Link to='/mypage/review'>1</Link>
        </UserItemBox>
      </div>
    </UserBox>
  );
};

export default MyPageUser;
