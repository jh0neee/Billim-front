import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import axios from 'axios';
import ErrorModal from '../../util/ErrorModal';
import LoadingSpinner from '../UI/LoadingSpinner';
import { useAuth } from '../../hooks/useAuth';
import { useLoadingError } from '../../hooks/useLoadingError';

const CouponLayout = styled.div`
  margin: 0.5rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const CouponTab = styled.div`
  margin-left: 0.5rem;
  display: flex;

  > p {
    margin: 0 0.5rem;
    font-weight: ${props => (props.active ? '700' : 'normal')};
    &.active {
      font-weight: 700;
    }
  }
`;

const EmptyCouponMessage = styled.p`
  margin: 5rem auto 0;
  width: fit-content;
`;

const CouponItemBox = styled.div`
  margin: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #fcd34d;
  line-height: 1.5;

  > * {
    &:first-child {
      font-family: TRoundWind;
      font-size: 2rem;
      font-weight: 700;
    }
  }
`;

const MyPageCoupon = () => {
  const url = process.env.REACT_APP_URL;
  const auth = useAuth();
  const [sortedCoupons, setSortedCoupons] = useState([]);
  const [activeTab, setActiveTab] = useState('newest');
  const { isLoading, error, onLoading, clearError, errorHandler } =
    useLoadingError();

  useEffect(() => {
    onLoading(true);
    axios
      .get(`${url}/coupon/list`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        params: {
          memberId: auth.memberId,
        },
      })
      .then(response => {
        setSortedCoupons(response.data);
        onLoading(false);
      })
      .catch(err => {
        errorHandler(err);
      });
  }, [auth.token]);

  const copyCoupons = [...sortedCoupons];

  const newestHandler = () => {
    setActiveTab('newest');
    setSortedCoupons(
      copyCoupons.sort((a, b) => new Date(a.date) - new Date(b.date)),
    );
  };

  const byDiscountHandler = () => {
    setActiveTab('byDiscount');
    setSortedCoupons(copyCoupons.sort((a, b) => b.discount - a.discount));
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <p>보유 쿠폰 {sortedCoupons.length}</p>
      <hr />
      <CouponTab>
        <p
          onClick={newestHandler}
          className={activeTab === 'newest' ? 'active' : ''}
        >
          최신순
        </p>
        |
        <p
          onClick={byDiscountHandler}
          className={activeTab === 'byDiscount' ? 'active' : ''}
        >
          할인순
        </p>
      </CouponTab>
      <hr />
      {sortedCoupons.length === 0 ? (
        <EmptyCouponMessage>보유 쿠폰이 없습니다.</EmptyCouponMessage>
      ) : (
        <CouponLayout>
          {sortedCoupons.map(item => (
            <CouponItemBox key={item.couponIssueId}>
              <p>{item.rate}%</p>
              <p>{item.name}</p>
              <p>{item.expiredAt.slice(0, 10)}까지</p>
            </CouponItemBox>
          ))}
        </CouponLayout>
      )}
    </>
  );
};

export default MyPageCoupon;
