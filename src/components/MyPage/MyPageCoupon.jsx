import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import axios from 'axios';
import ErrorModal from '../../util/ErrorModal';
import { useAuth } from '../../hooks/useAuth';
import { useLoadingError } from '../../hooks/useLoadingError';
import { useTokenRefresher } from '../../hooks/useTokenRefresher';
import { useContentResize } from '../../hooks/useContentResize';

const CouponLayout = styled.div`
  margin: 0.5rem 0;
  display: grid;
  grid-template-columns: ${props => (props.coupon ? '1fr' : '1fr 1fr')};
`;

const CouponTab = styled.div`
  margin-left: 0.5rem;
  display: flex;

  > p {
    cursor: pointer;
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
  margin: ${props => (props.coupon ? '1rem 2rem' : '1rem')};
  padding: 1rem 1.5rem;
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

    &:last-child {
      font-size: 0.8rem;
    }
  }

  @media (max-width: 450px) {
    margin: 1rem;
  }
`;

const MyPageCoupon = () => {
  const url = process.env.REACT_APP_URL;
  const auth = useAuth();
  const couponRef = useRef(null);
  const [sortedCoupons, setSortedCoupons] = useState([]);
  const [activeTab, setActiveTab] = useState('newest');
  const { tokenErrorHandler } = useTokenRefresher(auth);
  const { error, clearError, errorHandler } = useLoadingError();
  const { contentResize } = useContentResize(400, couponRef);

  useEffect(() => {
    fetchCoupons();
  }, [auth.token]);

  const fetchCoupons = () => {
    let urlToFetch;

    if (activeTab === 'newest') {
      urlToFetch = `${url}/coupon/list`;
    } else if (activeTab === 'byDiscount') {
      urlToFetch = `${url}/coupon/list/rate`;
    }

    axios
      .get(urlToFetch, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        params: {
          memberId: auth.memberId,
        },
      })
      .then(response => {
        setSortedCoupons(response.data);
      })
      .catch(err => {
        if (
          err.response.status === 401 &&
          err.response.data.code !== 'INVALID_EMAIL_PASSWORD'
        ) {
          tokenErrorHandler(err);
        } else {
          errorHandler(err);
        }
      });
  };

  const newestHandler = () => {
    setActiveTab('newest');
    fetchCoupons();
  };

  const byDiscountHandler = () => {
    setActiveTab('byDiscount');
    fetchCoupons();
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
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
        <CouponLayout ref={couponRef} coupon={contentResize}>
          {sortedCoupons.map(item => (
            <CouponItemBox key={item.couponIssueId} coupon={contentResize}>
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
