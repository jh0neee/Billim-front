import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../styles/theme';

const UserItemLayout = styled.div`
  min-width: 300px;
  width: 500px;

  @media (max-width: 674px) {
    flex-direction: column;
    min-width: 161px;
  }
  @media ${theme.mobile} {
    min-width: 200px;
    width: 280px;
  }
`;

const UserItemBox = styled.div`
  border-left: 1px solid #dee2e6;
  width: 170px;
  height: 110px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  padding: 1.2rem 0.8rem 0.8rem 0.8rem;
  margin: 0 0.5rem 0 0;
  font-weight: 600;

  > * {
    &:first-child {
      align-self: flex-start;
    }

    &:last-child {
      font-size: 1.5rem;
    }
  }

  @media (max-width: 980px) {
    display: block;
    width: calc(100% / 3);
    text-align: center;
    margin: 0;
    padding: 1.2rem 0.8rem;

    > * {
      &:first-child {
        margin-bottom: 2rem;
      }
    }
  }

  @media (max-width: 674px) {
    display: flex;
    height: 45px;
    flex-direction: row;
    width: 100%;
    align-items: flex-end;
    padding: 0.5rem 0.8rem;
    > * {
      &:first-child {
        margin-bottom: 0;
        align-self: flex-end;
        margin-right: 0.3rem;
      }
    }
  }

  @media ${theme.mobile} {
    border: none;
  }
`;

const MyPageUserReward = ({ user }) => {
  return (
    <UserItemLayout>
      <UserItemBox firstSection>
        <p>적립금</p>
        <p>{user.availableAmount}원</p>
      </UserItemBox>
      <UserItemBox>
        <p>쿠폰</p>
        <Link to="/mypage/coupon">{user.availableCouponCount}장</Link>
      </UserItemBox>
      <UserItemBox>
        <p>후기작성</p>
        <Link to="/mypage/review">{user.availableReview}건</Link>
      </UserItemBox>
    </UserItemLayout>
  );
};

export default MyPageUserReward;
