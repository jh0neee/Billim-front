import React from "react";
import styled, { css } from "styled-components";
import Dropdown from "../../components/UI/DropDown";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import usePostalCode from "../../hooks/usePostalCode";
import { BsCheck2Circle } from "react-icons/bs";
import { VALIDATOR_REQUIRE } from "../../util/validators";
import { TradeMethod, coupons } from "../../data";

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

  ${(props) =>
    props.lyt &&
    css`
      margin-top: -0.45rem;
      grid-template-columns: 4.6fr 1.8fr 0.5fr;
      justify-items: end;
    `}
  ${(props) =>
    props.small &&
    css`
      margin: 5px;
      grid-template-columns: 2fr 2fr 2.7fr;
      justify-items: start;
    `}
`;

const TradeMethodOption = styled.p`
  font-size: 0.94rem;
`;

const ProductInformation = ({
  items,
  tradeSelectedOpt,
  setTradeSelectedOpt,
  couponSelectedOpt,
  setCouponSelectedOpt,
  onInput
}) => {
  const [postCode, address, legal, postCodeOpenHandler] =
    usePostalCode(onInput);

  return (
    <PayInformation>
      <InformationTitle>대여정보</InformationTitle>
      <InformationBox>
        <PayTitle>
          <BsCheck2Circle size='25px' />
          <p>이용일자</p>
        </PayTitle>
        <p>23-05-12 ~ 23-05-17</p>
      </InformationBox>
      <InformationBox>
        <PayTitle>
          <BsCheck2Circle size='25px' />
          <p>거래방법</p>
        </PayTitle>
        {items.trade === "직거래" ? (
          <TradeMethodOption>직거래</TradeMethodOption>
        ) : items.trade === "택배" ? (
          <TradeMethodOption>택배</TradeMethodOption>
        ) : (
          <TradeDropDown
            options={TradeMethod.filter((opt) => opt.value !== "둘 다 가능")}
            selectedOpt={tradeSelectedOpt}
            setSelectedOpt={setTradeSelectedOpt}
          />
        )}
      </InformationBox>
      <hr />
      <InformationBox>
        {/* //TODO - 사용에 적은 금액이 보유 적립금에서 차감 */}
        <PayTitle>
          <BsCheck2Circle size='25px' />
          <p>적립금</p>
        </PayTitle>
        <DeliveryItems small>
          <p>보유적립금</p>
          <p>3,000</p>
        </DeliveryItems>
        <DeliveryItems small>
          <p>사용</p>
          <Input
            bar
            id='use_point'
            element='input'
            width='8.5rem'
            height='20px'
            validators={[VALIDATOR_REQUIRE()]}
            errorText={null}
            onInput={onInput}
          />
          <Button type="button" sub small width='80px'>
            사용
          </Button>
        </DeliveryItems>
      </InformationBox>
      <InformationBox>
        <PayTitle>
          <BsCheck2Circle size='25px' />
          <p>쿠폰</p>
        </PayTitle>
        <TradeDropDown
          options={coupons}
          selectedOpt={couponSelectedOpt}
          setSelectedOpt={setCouponSelectedOpt}
        />
      </InformationBox>
      <hr />
      {(items.trade === "택배" || tradeSelectedOpt === "택배") && (
        <PayDelivery>
          <DeliveryItems>
            <PayTitle>이름</PayTitle>
            <Input
              element='input'
              id='name'
              type='text'
              width='17.5rem'
              placeholder='이름 입력해주세요'
              validators={[VALIDATOR_REQUIRE()]}
              errorText={null}
              onInput={onInput}
            />
          </DeliveryItems>
          <DeliveryItems>
            <PayTitle>주소</PayTitle>
            <Input
              element='input'
              id='address'
              type='text'
              width='17.5rem'
              placeholder='우편번호'
              validators={[VALIDATOR_REQUIRE()]}
              value={postCode}
              errorText={null}
              onInput={onInput}
              disabled={true}
            />
            <Button sub small width='120px' onClick={postCodeOpenHandler}>
              우편번호 찾기
            </Button>
          </DeliveryItems>
          <DeliveryItems lyt>
            <Input
              element='input'
              type='text'
              id='address'
              width='17.5rem'
              placeholder='도로명주소'
              validators={[VALIDATOR_REQUIRE()]}
              value={address}
              errorText='주소를 입력해주세요'
              onInput={onInput}
              disabled={true}
            />
          </DeliveryItems>
          <DeliveryItems lyt>
            <Input
              element='input'
              type='text'
              id='address_detail'
              width='17.5rem'
              placeholder='상세주소 입력해주세요'
              validators={[VALIDATOR_REQUIRE()]}
              errorText={null}
              onInput={onInput}
            />
            <Input
              element='input'
              type='text'
              id='address_legal'
              width='9.5rem'
              placeholder='(법정동)'
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
              element='input'
              id='phone'
              type='text'
              width='17.5rem'
              placeholder='전화번호 입력해주세요'
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
