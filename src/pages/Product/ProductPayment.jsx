/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import axios from 'axios';
import ErrorModal from '../../util/ErrorModal';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import PaymentConfirm from '../../components/Product/PaymentConfirm';
import PaymentInformation from '../../components/Product/PaymentInformation';
import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../hooks/useAuth';
import { HiChevronLeft } from 'react-icons/hi';
import { useLoadingError } from '../../hooks/useLoadingError';

const PaymentLayout = styled.form`
  width: 80%;
  margin: 120px auto 0;
  font-family: 'SCDream';
`;
const PaymentTitle = styled.div`
  display: flex;
  align-items: center;
  font-family: 'TRoundWind';
  font-size: 1.65rem;
  font-weight: 700;
`;

const GoBack = styled(HiChevronLeft)`
  cursor: pointer;
`;

const PaymentBox = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 1.5rem;
  padding: 2.5rem 0px;
`;

const ProductPayment = () => {
  const url = process.env.REACT_APP_URL;
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    rentalDate,
    days,
    image,
    tradeMethod,
    name,
    category,
    price,
    seller,
  } = location.state;

  const [coupon, setCoupon] = useState([]);
  const [tradeSelectedOpt, setTradeSelectedOpt] = useState('');
  const [couponSelectedOpt, setCouponSelectedOpt] = useState('');
  const [formState, inputHandler] = useForm({}, false);
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
        const responseData = response.data;

        const coupons = responseData.map(coupon => ({
          ...coupon,
          name: `${coupon.name} (${coupon.rate}%)`,
        }));

        const couponList =
          coupons.length === 0
            ? [{ name: '사용가능한 쿠폰이 없습니다' }]
            : [{ name: '선택하세요' }, ...coupons];

        setCoupon(couponList);
        onLoading(false);
      })
      .catch(err => {
        errorHandler(err);
      });
  }, [setCoupon]);

  const onSubmit = e => {
    e.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <PaymentLayout onSubmit={onSubmit}>
        {isLoading && <LoadingSpinner asOverlay />}
        <PaymentTitle>
          <GoBack size="45px" onClick={() => navigate(-1)} />
          확인 및 결제
        </PaymentTitle>
        <PaymentBox>
          <PaymentInformation
            tradeMethod={tradeMethod}
            rentalDate={rentalDate}
            coupon={coupon}
            tradeSelectedOpt={tradeSelectedOpt}
            setTradeSelectedOpt={setTradeSelectedOpt}
            couponSelectedOpt={couponSelectedOpt}
            setCouponSelectedOpt={setCouponSelectedOpt}
            onInput={inputHandler}
            formState={formState}
          />
          <div>
            <PaymentConfirm
              coupon={coupon}
              imageUrl={image}
              amount={price}
              tradeMethod={tradeMethod}
              category={category}
              name={name}
              seller={seller}
              days={days}
              tradeSelectedOpt={tradeSelectedOpt}
              couponSelectedOpt={couponSelectedOpt}
              onInput={inputHandler}
            />
          </div>
        </PaymentBox>
      </PaymentLayout>
    </>
  );
};

export default ProductPayment;
