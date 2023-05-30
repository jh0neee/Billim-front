import React, { useEffect } from "react";
import styled from "styled-components";

import Button from "../../components/UI/Button";
import { coupons } from "../../data";

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
`;

const ConfirmTop = styled.div`
  column-count: 2;

  > * {
    &:last-child {
      font-size: 0.9rem;
      font-weight: 600;
      padding-top: 0.1px;

      > p {
        margin: 0.5rem 0;
      }
      .name {
        margin-top: 1.5rem;
      }
    }
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

const PaymentConfirm = ({ items, tradeSelectedOpt, couponSelectedOpt, onInput }) => {
  const discountItem = coupons.find((item) => item.value === couponSelectedOpt);
  const discount = discountItem?.discount || 0;

  const courierFee =
    tradeSelectedOpt === "택배" || items.trade === "택배" ? 3000 : 0;
  const point = 4000;
  const discounted = Math.round(items.amount * (discount / 100));
  const days = 4;
  const total = items.amount * days + courierFee - discounted - point;

  useEffect(() => {
    onInput("total", total, true);
  }, [onInput, total]);

  return (
    <ConfirmBox>
      <ConfirmTop>
        <img src='https://via.placeholder.com/100x100' alt='상품예시이미지' />
        <div>
          <p>[ {items.category} ]</p>
          <p>{items.name}</p>
          <p className='name'>판매자명</p>
        </div>
      </ConfirmTop>
      <hr />
      <ConfirmBottom>
        <p>요금세부정보</p>
        <ParagraphBox>
          <p className='left'>\ {items.amount.toLocaleString("ko-KR")} / 일</p>
          <p className='right'>\ {items.amount.toLocaleString("ko-KR")}</p>
        </ParagraphBox>
        <ParagraphBox>
          <p className='left'>대여일</p>
          <p className='right'>{days}일</p>
        </ParagraphBox>
        <ParagraphBox>
          <p className='left'>배송료</p>
          <p className='right'>\ {courierFee.toLocaleString("ko-KR")}</p>
        </ParagraphBox>
        <ParagraphBox>
          <p className='left'>쿠폰적용</p>
          <p className='right'>- \ {discounted}</p>
        </ParagraphBox>
        <ParagraphBox>
          <p className='left'>적립금적용</p>
          <p className='right'>- \ {point}</p>
        </ParagraphBox>
      </ConfirmBottom>
      <hr />
      <ParagraphBox>
        <p className='left'>총 합계</p>
        <p className='right'>
          \ {isNaN(total) ? 0 : total.toLocaleString("ko-KR")}
        </p>
      </ParagraphBox>
      <Button width='90%' type='submit'>확인 및 결제</Button>
    </ConfirmBox>
  );
};

export default PaymentConfirm;
