import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import Button from '../../components/UI/Button';
import theme from '../../styles/theme';

const ConfirmBox = styled.div`
  position: sticky;
  top: 85px;
  width: 80%;
  margin: 0 auto;
  padding: 1rem;
  background: #ededed;

  > * {
    margin: 1.6rem 0;

    &:last-child {
      margin: 2rem 0 1rem 0.6rem;
    }

    &:nth-child(5) {
      margin: 0 0.5rem;
      padding: 0 0.1rem;
      font-weight: 600;
      font-size: 17.5px;
    }
  }

  @media ${theme.tablet} {
    position: static;
    width: 97%;
    margin: 1.3rem auto 0;

    > * {
      margin: 1.6rem 1rem;

      &:last-child {
        margin: 2rem 1rem 1rem 1.4rem;
      }

      &:nth-child(5) {
        margin: 0 1.5rem;
      }
    }
  }
`;

const ConfirmTop = styled.div`
  display: flex;

  > img {
    width: 80px;
    height: 90px;
  }

  > * {
    &:last-child {
      margin-left: 1rem;
      font-size: 0.9rem;
      font-weight: 600;
      padding-top: 0.1px;

      > p {
        margin: 0.5rem 0;
      }
      .sellerName {
        margin-top: 1.5rem;
      }
    }
  }

  @media ${theme.tablet} {
    margin: 1.6rem 1.5rem;
  }
`;

const ConfirmBottom = styled.div`
  display: grid;
  align-items: center;

  > * {
    margin: 0.7rem 0.5rem;

    &:first-child {
      margin-bottom: 1rem;
      font-weight: 500;
      font-size: 1.05rem;
    }

    &:nth-child(n + 2) {
      font-size: 0.88rem;
    }
  }
`;

const ParagraphBox = styled.div`
  padding: 0 0.1rem;
  font-size: 15px;

  .left {
    float: left;
  }

  .right {
    float: right;
  }
`;

const PaymentConfirm = ({
  coupon,
  discount,
  imageUrl,
  amount,
  tradeMethod,
  category,
  name,
  seller,
  days,
  tradeSelectedOpt,
  couponSelectedOpt,
  onInput,
}) => {
  const discountItem = coupon.find(item => item.name === couponSelectedOpt);
  const courierFee =
    tradeSelectedOpt === 'DELIVERY' || tradeMethod === 'DELIVERY' ? 3000 : 0;
  const point = useSelector(state => state.point.usagePoint);
  const numberOfDays = days;
  const total = amount * numberOfDays + courierFee - discount - point;

  useEffect(() => {
    const couponIssueId = discountItem?.couponIssueId;

    onInput('total', total, true);
    onInput('couponIssueId', couponIssueId, true);
    onInput('usedPoint', Number(point), true);
  }, [onInput, point, total, discountItem?.couponIssueId]);

  return (
    <ConfirmBox>
      <ConfirmTop>
        <img src={imageUrl} alt={`[상품] ${name}`} />
        <div>
          <p>[ {category} ]</p>
          <p>{name}</p>
          <p className="sellerName">{seller}</p>
        </div>
      </ConfirmTop>
      <hr />
      <ConfirmBottom>
        <p>요금세부정보</p>
        <ParagraphBox>
          <p className="left">\ {amount.toLocaleString('ko-KR')} / 일</p>
          <p className="right">\ {amount.toLocaleString('ko-KR')}</p>
        </ParagraphBox>
        <ParagraphBox>
          <p className="left">대여일</p>
          <p className="right">{numberOfDays}일</p>
        </ParagraphBox>
        <ParagraphBox>
          <p className="left">배송료</p>
          <p className="right">\ {courierFee.toLocaleString('ko-KR')}</p>
        </ParagraphBox>
        <ParagraphBox>
          <p className="left">쿠폰적용</p>
          <p className="right">- \ {discount.toLocaleString('ko-KR')}</p>
        </ParagraphBox>
        <ParagraphBox>
          <p className="left">적립금적용</p>
          <p className="right">- \ {Number(point).toLocaleString('ko-KR')}</p>
        </ParagraphBox>
      </ConfirmBottom>
      <hr />
      <ParagraphBox>
        <p className="left">총 합계</p>
        <p className="right">
          \ {isNaN(total) ? 0 : total.toLocaleString('ko-KR')}
        </p>
      </ParagraphBox>
      <Button width="90%" type="submit">
        확인 및 결제
      </Button>
    </ConfirmBox>
  );
};

export default PaymentConfirm;
