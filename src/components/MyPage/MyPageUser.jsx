import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Profile } from '../UI/Profile';
import { coupons, review } from '../../data';

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
  const reviewCount = review.filter(item => item.isReview === false).length;

  return (
    <UserBox>
      <div>
        <Profile size="130px" />
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
          <Link to="/mypage/coupon">{coupons.length}</Link>
        </UserItemBox>
        <UserItemBox>
          <p>후기작성</p>
          <Link to="/mypage/review">{reviewCount}</Link>
        </UserItemBox>
      </div>
    </UserBox>
  );
};

export default MyPageUser;
