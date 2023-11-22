import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import theme from '../../styles/theme';
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

  @media (max-width: 412px) {
    width: 300px;
    margin: 0 auto;
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
  @media (max-width: 412px) {
    > * {
      margin: 1.3rem 0;

      &:nth-child(n + 2) {
        margin: 0;
      }
    }
  }
`;

export const PayTitle = styled.div`
  display: flex;
  align-items: center;
  color: ${props => (props.lyt ? 'white' : 'black')};
  font-size: 1.25rem;
  font-weight: 600;

  > p {
    margin-left: 0.5rem;
  }

  @media (max-width: 1140px) {
    margin-bottom: 0.3rem;
  }

  @media ${theme.tablet} {
    display: ${props => props.lyt && 'none'};
  }
`;

const TradeDropDown = styled(Dropdown)`
  margin-left: 4.2rem !important;
  width: 15rem;

  @media (max-width: 412px) {
    margin-left: 2rem !important;
    width: 15.5rem;
  }
`;

const PayDelivery = styled.div`
  margin: 2.5rem 0 2rem 2rem;

  @media ${theme.tablet} {
    margin: 2.5rem 2rem 2rem;
  }

  @media ${theme.mobile} {
    margin: 2.5rem 1rem 2rem;
  }
`;

const DeliveryItems = styled.div`
  display: grid;
  grid-template-columns: 2fr 4fr 3.5fr;
  align-items: center;
  margin: 2rem 0;

  * {
    > input {
      width: calc(100% + 136px);
    }
  }

  @media (max-width: 1140px) {
    grid-template-columns: 1fr;
    * {
      > input {
        width: 100%;
      }
    }
  }
`;

const DeliveryAddress = styled.div`
  display: grid;
  grid-template-columns: 2fr 4fr 3.5fr;
  align-items: center;
  margin: 1rem 0;
  margin-top: -0.45rem;

  * {
    > input {
      width: ${props => (props.road ? 'calc(100% + 136px)' : '100%')};
    }
  }

  @media (min-width: 769px) and (max-width: 1140px) {
    grid-template-columns: ${props =>
      props.road ? '2fr 7.5fr' : '2fr 4fr 3.5fr'};

    * {
      > input {
        width: 100%;
      }
    }
  }

  @media ${theme.tablet} {
    ${props =>
      props.postCode &&
      css`
        grid-template-rows: 0.5fr 1fr;
        grid-template-columns: 2.5fr 0.5fr;
        * {
          &:first-child {
            grid-area: ${props => props.postCode && '1/1/2/3'};
          }

          &:nth-child(2) {
            grid-area: ${props => props.postCode && '2/1/3/2'};
          }

          &:last-child {
            grid-area: ${props => props.postCode && '2/2/3/3'};
          }
        }
      `}

    ${props =>
      props.road &&
      css`
        grid-template-columns: 1fr;
        * {
          > input {
            width: 100%;
          }
        }
      `};

    ${props =>
      props.detail &&
      css`
        grid-template-columns: 3fr 1fr;
      `};
  }

  @media (max-width: 480px) {
    ${props =>
      props.detail &&
      css`
        grid-template-columns: 1fr;
      `};
  }
`;

const LegalInput = styled(Input)`
  margin-left: 0.5rem;
  width: 128px;

  @media (min-width: 769px) and (max-width: 1140px) {
    width: calc(100% - 8px);
  }

  @media ${theme.mobile} {
    margin: 0;
    width: 100%;
  }
`;

const PostCodeButton = styled(Button)`
  width: 120px;
  margin-left: 1rem;

  @media (min-width: 769px) and (max-width: 1140px) {
    width: 88%;
  }
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
              placeholder="이름 입력해주세요"
              validators={[VALIDATOR_REQUIRE()]}
              errorText={null}
              onInput={onInput}
            />
          </DeliveryItems>
          <DeliveryAddress postCode={true}>
            <PayTitle>주소</PayTitle>
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
            <PostCodeButton
              type="button"
              sub
              small
              onClick={postCodeOpenHandler}
            >
              우편번호 찾기
            </PostCodeButton>
          </DeliveryAddress>
          <DeliveryAddress road={true}>
            <PayTitle lyt>주소</PayTitle>
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
          </DeliveryAddress>
          <DeliveryAddress detail={true}>
            <PayTitle lyt>주소</PayTitle>
            <Input
              element="input"
              type="text"
              id="address_detail"
              placeholder="상세주소 입력해주세요"
              validators={[VALIDATOR_REQUIRE()]}
              errorText={null}
              onInput={onInput}
            />
            <LegalInput
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
          </DeliveryAddress>
          <DeliveryItems>
            <PayTitle>전화번호</PayTitle>
            <Input
              element="input"
              id="phone"
              type="text"
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
