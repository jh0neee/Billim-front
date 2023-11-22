import React, { useEffect, useState } from 'react';
import * as P from './styles/Product.styles';

import Input from '../../components/UI/Input';
import PaymentPoint from './PaymentPoint';
import usePostalCode from '../../hooks/usePostalCode';
import { BsCheck2Circle } from 'react-icons/bs';
import { VALIDATOR_REQUIRE } from '../../util/validators';
import { TradeMethod } from '../../data';

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
    const selectedTradeMethod = tradeSelectedOpt;
    const activeTradeMethod = tradeMethod[0];

    if (tradeSelectedOpt === '') {
      if (tradeMethod.length === 1) {
        onInput('tradeMethod', activeTradeMethod, true);
      } else {
        onInput('tradeMethod', selectedTradeMethod, false);
      }
    } else {
      onInput('tradeMethod', selectedTradeMethod, true);
    }
  }, [tradeMethod, tradeSelectedOpt]);

  return (
    <P.PayInformation>
      <P.InformationTitle>대여정보</P.InformationTitle>
      <P.InformationBox>
        <P.PayTitle>
          <BsCheck2Circle size="25px" />
          <p>이용일자</p>
        </P.PayTitle>
        <p>{rentalDate}</p>
      </P.InformationBox>
      <P.InformationBox>
        <P.PayTitle>
          <BsCheck2Circle size="25px" />
          <p>거래방법</p>
        </P.PayTitle>
        {tradeMethod.length === 1 && tradeMethod.includes('DIRECT') ? (
          <P.TradeMethodOption>직거래</P.TradeMethodOption>
        ) : tradeMethod.length === 1 && tradeMethod.includes('DELIVERY') ? (
          <P.TradeMethodOption>택배</P.TradeMethodOption>
        ) : (
          <P.TradeDropDown
            options={TradeMethod.filter(opt => opt.name !== 'ALL')}
            selectedOpt={tradeSelectedOpt}
            setSelectedOpt={setTradeSelectedOpt}
          />
        )}
      </P.InformationBox>
      <hr />
      <P.InformationBox>
        <P.PayTitle>
          <BsCheck2Circle size="25px" />
          <p>적립금</p>
        </P.PayTitle>
        <PaymentPoint
          onInput={onInput}
          formState={formState}
          total={totalPrice}
          discount={discount}
        />
      </P.InformationBox>
      <P.InformationBox>
        <P.PayTitle>
          <BsCheck2Circle size="25px" />
          <p>쿠폰</p>
        </P.PayTitle>
        <P.TradeDropDown
          options={coupon}
          selectedOpt={couponSelectedOpt}
          setSelectedOpt={setCouponSelectedOpt}
        />
      </P.InformationBox>
      <hr />
      {isDeliveryTrade && (
        <P.PayDelivery>
          <P.DeliveryItems>
            <P.PayTitle>이름</P.PayTitle>
            <Input
              element="input"
              id="name"
              type="text"
              placeholder="이름 입력해주세요"
              validators={[VALIDATOR_REQUIRE()]}
              errorText={null}
              onInput={onInput}
            />
          </P.DeliveryItems>
          <P.DeliveryAddress postCode={true}>
            <P.PayTitle>주소</P.PayTitle>
            <Input
              element="input"
              id="address"
              type="text"
              placeholder="우편번호"
              validators={[VALIDATOR_REQUIRE()]}
              value={postCode}
              errorText={null}
              onInput={onInput}
              disabled={true}
            />
            <P.PostCodeButton
              type="button"
              sub
              small
              onClick={postCodeOpenHandler}
            >
              우편번호 찾기
            </P.PostCodeButton>
          </P.DeliveryAddress>
          <P.DeliveryAddress road={true}>
            <P.PayTitle lyt>주소</P.PayTitle>
            <Input
              element="input"
              type="text"
              id="address"
              placeholder="도로명주소"
              validators={[VALIDATOR_REQUIRE()]}
              value={address}
              errorText="주소를 입력해주세요"
              onInput={onInput}
              disabled={true}
            />
          </P.DeliveryAddress>
          <P.DeliveryAddress detail={true}>
            <P.PayTitle lyt>주소</P.PayTitle>
            <Input
              element="input"
              type="text"
              id="address_detail"
              placeholder="상세주소 입력해주세요"
              validators={[VALIDATOR_REQUIRE()]}
              errorText={null}
              onInput={onInput}
            />
            <P.LegalInput
              element="input"
              type="text"
              id="address_legal"
              placeholder="(법정동)"
              validators={[VALIDATOR_REQUIRE()]}
              errorText={null}
              value={legal}
              onInput={onInput}
              disabled={true}
            />
          </P.DeliveryAddress>
          <P.DeliveryItems>
            <P.PayTitle>전화번호</P.PayTitle>
            <Input
              element="input"
              id="phone"
              type="text"
              placeholder="전화번호 입력해주세요"
              validators={[VALIDATOR_REQUIRE()]}
              errorText={null}
              onInput={onInput}
            />
          </P.DeliveryItems>
        </P.PayDelivery>
      )}
    </P.PayInformation>
  );
};

export default ProductInformation;
