import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import { coupons, review } from '../../data';

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

const MyPageUserReward = () => {
  const reviewCount = review.filter(item => item.isReview === false).length;

  return (
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
  );
};

export default MyPageUserReward;
