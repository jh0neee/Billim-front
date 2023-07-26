import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import Dropdown from '../../components/UI/DropDown';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import PaymentPoint from './PaymentPoint';
import usePostalCode from '../../hooks/usePostalCode';
import { BsCheck2Circle } from 'react-icons/bs';
import { VALIDATOR_REQUIRE } from '../../util/validators';
import { TradeMethod } from '../../data';

const PayInformation = styled.div`
  padding: 0.5rem;

  > * {
    margin-left: 0.8rem;
    font-size: 0.9rem;

    &:nth-child(3n + 1) {
      margin-left: 0;
    }
  }
`;

const InformationTitle = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
`;

const InformationBox = styled.div`
  margin: 2rem 0;

  > * {
    margin: 1.3rem;

    &:nth-child(n + 2) {
      margin-left: 3.5rem;
    }
  }
`;

export const PayTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  font-weight: 600;

  > p {
    margin-left: 0.5rem;
  }
`;

const TradeDropDown = styled(Dropdown)`
  margin-left: 4.2rem !important;
  width: 15rem;
`;

const PayDelivery = styled.div`
  margin: 2.5rem 0 2rem 2rem;
`;

export const DeliveryItems = styled.div`
  display: grid;
  grid-template-columns: 2fr 5fr 2.5fr;
  align-items: center;
  margin-top: 1rem;

  ${props =>
    props.lyt &&
    css`
      margin-top: -0.45rem;
      grid-template-columns: 4.6fr 1.8fr 0.5fr;
      justify-items: end;
    `}
`;

const TradeMethodOption = styled.p`
  font-size: 0.94rem;
`;

const ProductInformation = ({
  tradeMethod,
  rentalDate,
  coupon,
  discount,
  amount,
  days,
  tradeSelectedOpt,
  setTradeSelectedOpt,
  couponSelectedOpt,
  setCouponSelectedOpt,
  onInput,
  formState,
}) => {
  const totalPrice = amount * days;
  const [postCode, address, legal, postCodeOpenHandler] =
    usePostalCode(onInput);
  const [isDeliveryTrade, setIsDeliveryTrade] = useState(false);

  useEffect(() => {
    if (tradeMethod.length === 2) {
      tradeSelectedOpt === 'DELIVERY'
        ? setIsDeliveryTrade(true)
        : setIsDeliveryTrade(false);
    } else {
      tradeMethod.includes('DELIVERY')
        ? setIsDeliveryTrade(true)
        : setIsDeliveryTrade(false);
    }
  }, [tradeMethod, tradeSelectedOpt]);

  useEffect(() => {
    const selectedTradeMethod = tradeSelectedOpt || tradeMethod[0];
    onInput('tradeMethod', selectedTradeMethod, true);
  }, [tradeMethod, tradeSelectedOpt]);

  return (
    <PayInformation>
      <InformationTitle>대여정보</InformationTitle>
      <InformationBox>
        <PayTitle>
          <BsCheck2Circle size="25px" />
          <p>이용일자</p>
        </PayTitle>
        <p>{rentalDate}</p>
      </InformationBox>
      <InformationBox>
        <PayTitle>
          <BsCheck2Circle size="25px" />
          <p>거래방법</p>
        </PayTitle>
        {tradeMethod.length === 1 && tradeMethod.includes('DIRECT') ? (
          <TradeMethodOption>직거래</TradeMethodOption>
        ) : tradeMethod.length === 1 && tradeMethod.includes('DELIVERY') ? (
          <TradeMethodOption>택배</TradeMethodOption>
        ) : (
          <TradeDropDown
            options={TradeMethod.filter(opt => opt.name !== 'ALL')}
            selectedOpt={tradeSelectedOpt}
            setSelectedOpt={setTradeSelectedOpt}
          />
        )}
      </InformationBox>
      <hr />
      <InformationBox>
        <PayTitle>
          <BsCheck2Circle size="25px" />
          <p>적립금</p>
        </PayTitle>
        <PaymentPoint
          onInput={onInput}
          formState={formState}
          total={totalPrice}
          discount={discount}
        />
      </InformationBox>
      <InformationBox>
        <PayTitle>
          <BsCheck2Circle size="25px" />
          <p>쿠폰</p>
        </PayTitle>
        <TradeDropDown
          options={coupon}
          selectedOpt={couponSelectedOpt}
          setSelectedOpt={setCouponSelectedOpt}
        />
      </InformationBox>
      <hr />
      {isDeliveryTrade && (
        <PayDelivery>
          <DeliveryItems>
            <PayTitle>이름</PayTitle>
            <Input
              element="input"
              id="name"
              type="text"
              width="17.5rem"
              placeholder="이름 입력해주세요"
              validators={[VALIDATOR_REQUIRE()]}
              errorText={null}
              onInput={onInput}
            />
          </DeliveryItems>
          <DeliveryItems>
            <PayTitle>주소</PayTitle>
            <Input
              element="input"
              id="address"
              type="text"
              width="17.5rem"
              placeholder="우편번호"
              validators={[VALIDATOR_REQUIRE()]}
              value={postCode}
              errorText={null}
              onInput={onInput}
              disabled={true}
            />
            <Button
              type="button"
              sub
              small
              width="120px"
              onClick={postCodeOpenHandler}
            >
              우편번호 찾기
            </Button>
          </DeliveryItems>
          <DeliveryItems lyt>
            <Input
              element="input"
              type="text"
              id="address"
              width="17.5rem"
              placeholder="도로명주소"
              validators={[VALIDATOR_REQUIRE()]}
              value={address}
              errorText="주소를 입력해주세요"
              onInput={onInput}
              disabled={true}
            />
          </DeliveryItems>
          <DeliveryItems lyt>
            <Input
              element="input"
              type="text"
              id="address_detail"
              width="17.5rem"
              placeholder="상세주소 입력해주세요"
              validators={[VALIDATOR_REQUIRE()]}
              errorText={null}
              onInput={onInput}
            />
            <Input
              element="input"
              type="text"
              id="address_legal"
              width="9.5rem"
              placeholder="(법정동)"
              validators={[VALIDATOR_REQUIRE()]}
              errorText={null}
              value={legal}
              onInput={onInput}
              disabled={true}
            />
          </DeliveryItems>
          <DeliveryItems>
            <PayTitle>전화번호</PayTitle>
            <Input
              element="input"
              id="phone"
              type="text"
              width="17.5rem"
              placeholder="전화번호 입력해주세요"
              validators={[VALIDATOR_REQUIRE()]}
              errorText={null}
              onInput={onInput}
            />
          </DeliveryItems>
        </PayDelivery>
      )}
    </PayInformation>
  );
};

export default ProductInformation;
