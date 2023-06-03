import React, { useState } from 'react';
import styled from 'styled-components';

import { coupons } from '../../data';

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
  const [sortedCoupons, setSortedCoupons] = useState(coupons);
  const [activeTab, setActiveTab] = useState('newest');

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
      <p>보유 쿠폰 {coupons.length}</p>
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
      <CouponLayout>
        {sortedCoupons.map(item => (
          <CouponItemBox key={item.id}>
            <p>{item.discount}%</p>
            <p>{item.item}</p>
            <p>{item.date}까지</p>
          </CouponItemBox>
        ))}
      </CouponLayout>
    </>
  );
};

export default MyPageCoupon;
